import "./styles.css";
import Gameboard from "./gameboard.js";
let gameboard;
window.addEventListener("load", () => {
  gameboard = new Gameboard();
});

document.getElementById("reset").addEventListener("click", () => {
  gameboard = new Gameboard();
});

document.getElementById("next").addEventListener("click", () => {
  gameboard.next();
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log("SW registered: ", registration);
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError);
      });
  });
}
