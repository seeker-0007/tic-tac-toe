import { useState } from "react";
import { WINNING_COMBINATIONS } from "./winning-combinations.js";

import Log from "./components/Log";
import PlayerInfo from "./components/PlayerInfo";
import GameBoard from "./components/GameBoard";
import GameOver from "./components/GameOver";

const INITIAL_PLAYERS = {
  X: "Player 1",
  O: "Player 2",
};

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveGameBoard(savedTurns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map((innerArray) => [...innerArray])];

  for (const turn of savedTurns) {
    const { square, player } = turn;

    gameBoard[square.row][square.col] = player;
  }

  return gameBoard;
}

function deriveWinner(gameBoard, players) {
  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    const symbols = [null, null, null];

    for (let i = 0; i < 3; i++) {
      symbols[i] = gameBoard[combination[i].row][combination[i].column];
    }

    if (symbols[0] && symbols[0] === symbols[1] && symbols[0] === symbols[2]) {
      winner = players[symbols[0]];
    }
  }

  return winner;
}

function deriveActivePlayer(savedTurns) {
  return savedTurns.length > 0 && savedTurns[0].player === "X" ? "O" : "X";
}

function App() {
  const [savedTurns, setSavedTurns] = useState([]);
  const [players, setPlayers] = useState(INITIAL_PLAYERS);

  const activePlayer = deriveActivePlayer(savedTurns);
  const gameBoard = deriveGameBoard(savedTurns);
  const winner = deriveWinner(gameBoard, players);

  function handleTurnChange(rowIndex, colIndex) {
    setSavedTurns((prevSavedTurns) => {
      const updatedSavedTurns = [
        {
          square: { row: rowIndex, col: colIndex },
          player: deriveActivePlayer(prevSavedTurns),
        },
        ...prevSavedTurns,
      ];

      return updatedSavedTurns;
    });
  }

  function handleRestart() {
    setSavedTurns([]);
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName,
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <PlayerInfo
            initialName={INITIAL_PLAYERS.X}
            symbol="X"
            isActive={activePlayer === "X"}
            onChangeName={handlePlayerNameChange}
          />
          <PlayerInfo
            initialName={INITIAL_PLAYERS.O}
            symbol="O"
            isActive={activePlayer === "O"}
            onChangeName={handlePlayerNameChange}
          />
        </ol>
        {(winner || (savedTurns.length === 9 && !winner)) && (
          <GameOver winner={winner} restart={handleRestart} />
        )}
        <GameBoard
          handleTurnChange={handleTurnChange}
          gameBoard={gameBoard}
          isEnd={winner}
        />
      </div>
      <Log turns={savedTurns} />
    </main>
  );
}

export default App;
