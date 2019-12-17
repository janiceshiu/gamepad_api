import { Consumer, consumerBecomesActive } from "./Consumer.js";
import { GamepadService } from "./GamepadService.js";

const gamepadService = new GamepadService();

document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("add-consumer")
    .addEventListener("click", addConsumer);
});

function addConsumer() {
  const c = new Consumer();
  document.getElementById("consumers").appendChild(c);
}
