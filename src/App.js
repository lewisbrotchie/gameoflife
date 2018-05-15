import { Client } from "boardgame.io/react";
import { Game } from "boardgame.io/core";
import TicTacToeBoard from "./Board";

function IsVictory(cells) {
  //return true if 'cells' is in a winning configuration.
  const positions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let pos of positions) {
    const symbol = cells[pos[0]];
    let winner = symbol;
    for (let i of pos) {
      if (cells[i] !== symbol) {
        winner = null;
        break;
      }
    }
    if (winner != null) return true;
  }

  return false;
}

const TicTacToe = Game({
  setup: () => ({ cells: Array(9).fill(null) }),

  moves: {
    clickCell(G, ctx, id) {
      const cells = [...G.cells];

      //Ensure we can't overwite cells.
      if (cells[id] === null) {
        cells[id] = ctx.currentPlayer;
      }
      return { ...G, cells };
    }
  },

  flow: {
    endGameIf: (G, ctx) => {
      if (IsVictory(G.cells)) {
        return ctx.currentPlayer;
      }
    }
  }
});

const App = Client({ game: TicTacToe, board: TicTacToeBoard });

export default App;
