import { Consumer } from "./Consumer.js";
import { GamepadService } from "./GamepadService.js";

const gamepadService = new GamepadService();

document.addEventListener("DOMContentLoaded", () => {
  const consumersDiv = document.getElementById("consumers");
  document.getElementById("add-consumer").addEventListener("click", () => {
    Consumer.attachConsumer(consumersDiv);
  });
});
