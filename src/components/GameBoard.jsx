export default function GameBoard({ handleTurnChange, gameBoard, isEnd }) {
  return (
    <ol id="game-board">
      {gameBoard.map((rowArray, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {rowArray.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button
                  onClick={() => handleTurnChange(rowIndex, colIndex)}
                  disabled={playerSymbol !== null || isEnd}
                >
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
