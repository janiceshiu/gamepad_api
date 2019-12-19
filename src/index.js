import { Consumer } from "./Consumer.js";
import { GamepadService } from "./GamepadService.js";

const gamepadService = new GamepadService();

document.addEventListener("DOMContentLoaded", () => {
  const consumersDiv = document.getElementById("consumers");
  document.getElementById("add-consumer").addEventListener("click", () => {
    const consumer = Consumer.attachConsumer(consumersDiv);

    consumer.addEventListener("activestatechange", event => {
      if (event.target.isActive) {
        gamepadService.deactivateConsumer(event.target);
      } else {
        gamepadService.activateConsumer(event.target);
      }
    });
  });
});

