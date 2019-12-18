import { Consumer } from "./Consumer.js";
import { GamepadService } from "./GamepadService.js";

const gamepadService = new GamepadService();

document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("add-consumer")
    .addEventListener("click", addConsumer);
});

export function addConsumer() {
  const c = new Consumer();
  document.getElementById("consumers").appendChild(c);

  c.addActivateConsumerListener(gamepadService);
}
