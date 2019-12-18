import { Consumer } from "./Consumer.js";
import { GamepadService } from "./GamepadService.js";

const gamepadService = new GamepadService();

document.addEventListener("DOMContentLoaded", () => {
  const consumersDiv = document.getElementById("consumers");
  document.getElementById("add-consumer").addEventListener("click", () => {
    Consumer.attachConsumer(consumersDiv);
  });
});

document.addEventListener("toggleConsumerIsActive", event => {
  if (event.target.isActive) {
    // deactivate consumer
    event.target.isActive = false;
    event.target.contentWindow.document.body.classList.toggle("active");
  } else {
    gamepadService.activateConsumer(event.target);
  }
});
