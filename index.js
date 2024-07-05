//import "./styles.css";
import Gameboard from "./gameboard.js";
window.addEventListener("load", () => {
  new Gameboard();
});

document.getElementById("reset").addEventListener("click", () => {
  new Gameboard();
});
