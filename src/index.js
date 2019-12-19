import { Consumer } from "./Consumer.js";
import { GamepadService } from "./GamepadService.js";

const gamepadService = new GamepadService();

document.addEventListener("DOMContentLoaded", () => {
  const consumersDiv = document.getElementById("consumers");
  document.getElementById("add-consumer").addEventListener("click", () => {
    Consumer.attachConsumer(consumersDiv);
  });
});

document.addEventListener("activestatechange", event => {
  if (event.target.isActive) {
    // deactivate consumer
    gamepadService.deactivateConsumer(event.target);
  } else {
    gamepadService.activateConsumer(event.target);
  }
});
