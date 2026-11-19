import React, { useState } from 'react';

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const emptyBoard = Array(9).fill(null);

function App() {
  const [board, setBoard] = useState(emptyBoard);
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [scores, setScores] = useState({ X: 0, O: 0, draws: 0 });
  const [winner, setWinner] = useState(null);
  const [isDraw, setIsDraw] = useState(false);

  const handleCellClick = (index) => {
    if (board[index] || winner || isDraw) return;

    const updatedBoard = [...board];
    updatedBoard[index] = currentPlayer;
    setBoard(updatedBoard);

    const hasWon = winningCombinations.some((combination) =>
      combination.every((cell) => updatedBoard[cell] === currentPlayer)
    );

    if (hasWon) {
      setWinner(currentPlayer);
      setScores((previous) => ({
        ...previous,
        [currentPlayer]: previous[currentPlayer] + 1,
      }));
    } else if (updatedBoard.every(Boolean)) {
      setIsDraw(true);
      setScores((previous) => ({
        ...previous,
        draws: previous.draws + 1,
      }));
    } else {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  };

  const restartRound = () => {
    setBoard(emptyBoard);
    setCurrentPlayer('X');
    setWinner(null);
    setIsDraw(false);
  };

  const resetAll = () => {
    restartRound();
    setScores({ X: 0, O: 0, draws: 0 });
  };

  let status = `Player ${currentPlayer}'s turn`;
  if (winner) status = `Player ${winner} wins!`;
  if (isDraw) status = "It's a draw!";

  return (
    <main className="app">
      <section className="game-container">
        <h1>Tic-Tac-Toe</h1>

        <div className="scoreboard">
          <div className="score x-score">
            <span>X</span>
            <strong>{scores.X}</strong>
          </div>
          <div className="score draw-score">
            <span>Draws</span>
            <strong>{scores.draws}</strong>
          </div>
          <div className="score o-score">
            <span>O</span>
            <strong>{scores.O}</strong>
          </div>
        </div>

        <p className="game-status" aria-live="polite">{status}</p>

        <div className="board">
          {board.map((cell, index) => (
            <button
              key={index}
              type="button"
              className={`cell ${cell ? `cell-${cell.toLowerCase()}` : ''}`}
              onClick={() => handleCellClick(index)}
              disabled={Boolean(cell) || Boolean(winner) || isDraw}
              aria-label={`Cell ${index + 1}${cell ? `: ${cell}` : ''}`}
            >
              {cell}
            </button>
          ))}
        </div>

        <div className="game-actions">
          <button type="button" onClick={restartRound}>
            Restart Round
          </button>
          <button type="button" className="reset-button" onClick={resetAll}>
            Reset All
          </button>
        </div>
      </section>
    </main>
  );
}

export default App;
