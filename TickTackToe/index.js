// Player Information
const $Turn = document.getElementById("Turn");
const $Symbol = document.getElementById("Symbol");
const $winning = document.getElementById("Win");
const $winPart = document.getElementById("winPart");
const $restart = document.getElementById("restart");

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const table = [];
class TicTacToe {
  constructor() {
    this.turn = +$Turn.innerHTML;
    this.selected = 0;
    this.GameActive = true;
  }

  getSymbol() {
    let Symbol;
    if (this.turn - 1 == 0) {
      Symbol = "X";
    } else {
      Symbol = "O";
    }
    return Symbol;
  }

  Win(draw, symbol) {
    $winPart.hidden = false;
    this.GameActive = false;
    if (draw) {
      $winning.innerHTML = "Draw";
    } else {
      $winning.innerHTML = symbol;
    }
  }

  SomeOneWin() {
    const symbol = this.getSymbol();

    for (let i = 0; i <= 7; i++) {
      const winCondition = winningConditions[i];

      if (this.selected >= 9) {
        console.log("Draw");
        return this.Win(true, symbol);
      }

      if (
        table[winCondition[0]].innerHTML == symbol &&
        table[winCondition[1]].innerHTML == symbol &&
        table[winCondition[2]].innerHTML == symbol
      ) {
        console.log("win " + symbol);
        return this.Win(false, symbol);
      }
    }
    console.log("No Win " + symbol);
    return;
  }
  clickFunction(Cell) {
    if (this.GameActive == false) return;
    const symbol = this.getSymbol();

    if (Cell.innerHTML == "O" || Cell.innerHTML == "X") {
      return;
    }
    this.selected++;

    Cell.innerHTML = symbol;
    this.SomeOneWin();

    if (this.turn == 1) {
      this.turn = 2;
    } else {
      this.turn = 1;
    }

    $Turn.innerHTML = this.turn;
    $Symbol.innerHTML = this.getSymbol();
  }
}

const Game = new TicTacToe();

document.querySelectorAll(".select").forEach((Cell) => {
  table.push(Cell);
  Cell.addEventListener("click", () => Game.clickFunction(Cell));
});

$restart.addEventListener("click", () => location.reload());
