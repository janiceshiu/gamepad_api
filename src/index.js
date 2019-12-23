import { Consumer } from "./Consumer.js";
import { Gamepad } from "./Gamepad.js";
import { GamepadButton } from "./GamepadButton.js";

document.addEventListener("DOMContentLoaded", () => {
  const consumersDiv = document.getElementById("consumers");
  document.getElementById("add-consumer").addEventListener("click", () => {
    Consumer.attachConsumer(consumersDiv);
  });

  const gamepadsDiv = document.getElementById("gamepads");
  document.getElementById("add-gamepad").addEventListener("click", () => {
    Gamepad.attachGamepad(gamepadsDiv);
  });
});
