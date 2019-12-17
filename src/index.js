// To start the gamepad service, the user agent MUST perform the following steps:
import { Consumer, consumerBecomesActive } from "./Consumer.js";
import { GamepadService } from "./GamepadService.js";

// If |gamepadServiceState| is null:

// NOTE: can be satisfied just having a new gamepad cos this is creating a html page, not creating a browser

// Set |gamepadService| to a new {{GamepadService}}.
const gamepadService = new GamepadService();

document.addEventListener("DOMContentLoaded", event => {
  setup();
});

function setup() {
  document.getElementById("add-consumer").addEventListener("click", () => {
    addConsumer();
  });
}

function addConsumer() {
  const c = new Consumer();
  document.getElementById("consumers").appendChild(c);
}
