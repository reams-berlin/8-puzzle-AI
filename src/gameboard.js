import GreedySearch from "./greedySearch.js";

class Gameboard {
  constructor() {
    this.board = this.initGameboard();
    this.checkSolvable();
    this.drawBoard();
    this.getPath();
  }

  getPath() {
    if (this.solvable) {
      let search = new GreedySearch(this.board);
      search.solution.shift();
      this.path = search.solution;
    }
  }

  next() {
    this.board = this.path.shift();
    this.drawBoard();
  }

  drawBoard() {
    const nextButton = document.getElementById("next");
    const gameboardElem = document.getElementById("gameboard");
    gameboardElem.innerHTML = "";
    for (let tileNumber of this.board) {
      let tileElem = document.createElement("div");
      tileElem.id = tileNumber;
      if (tileNumber === 0) {
        tileElem.classList.add("blank");
      } else {
        tileElem.innerHTML = tileNumber;
        tileElem.classList.add("tile");
      }
      tileElem.addEventListener("click", () => {
        if (tileElem.classList.contains("movable")) {
          let blank = this.board.indexOf(0);
          let clicked = this.board.indexOf(tileNumber);
          [this.board[blank], this.board[clicked]] = [
            this.board[clicked],
            this.board[blank],
          ];
          this.drawBoard();
          this.getPath();
        }
      });
      gameboardElem.appendChild(tileElem);
    }
    if (this.board.every((value, index) => value === this.goalBoard[index])) {
      nextButton.innerHTML = "Solved";
      nextButton.disabled = true;
    } else if (!this.solvable) {
      nextButton.innerHTML = "Not Solvable";
      nextButton.disabled = true;
    } else {
      nextButton.innerHTML = "Next";
      nextButton.disabled = false;
    }
    this.drawMovable();
  }

  goalBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8];

  initGameboard() {
    let array = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    //Fisher-Yates shuffle
    for (let i = 8; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
  }

  checkSolvable() {
    let inversionCount = 0;
    for (let i = 0; i < 8; i++) {
      for (let j = i + 1; j < 9; j++) {
        if (this.board[j] && this.board[i] && this.board[i] > this.board[j]) {
          inversionCount++;
        }
      }
    }
    this.solvable = inversionCount % 2 === 0;
  }

  getMovable(state) {
    let blank = state.indexOf(0);
    let movable = [];
    switch (blank) {
      case 0:
        movable = [1, 3];
        break;
      case 1:
        movable = [0, 2, 4];
        break;
      case 2:
        movable = [1, 5];
        break;
      case 3:
        movable = [0, 4, 6];
        break;
      case 4:
        movable = [1, 3, 5, 7];
        break;
      case 5:
        movable = [2, 4, 8];
        break;
      case 6:
        movable = [3, 7];
        break;
      case 7:
        movable = [4, 6, 8];
        break;
      case 8:
        movable = [5, 7];
        break;
    }
    return movable;
  }

  drawMovable() {
    this.movable = this.getMovable(this.board);
    const gameboard = document.getElementById("gameboard");
    for (let index of this.movable) {
      const elem = gameboard.children[index];
      elem.classList.add("movable");
    }
  }
}

export default Gameboard;
