class Gameboard {
  constructor() {
    console.log("Are you there?");
    this.board = this.initGameboard();
    this.drawBoard();
  }

  drawBoard() {
    console.log("here");
    const gameboardElem = document.getElementById("gameboard");
    for (let tileNumber of this.board) {
      let tileElem = document.createElement("div");
      tileElem.id = tileNumber;
      if (tileNumber === 0) {
        tileElem.classList.add("blank");
      } else {
        tileElem.innerHTML = tileNumber;
        tileElem.classList.add("tile");
      }
      gameboardElem.appendChild(tileElem);
    }
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
}

export default Gameboard;
