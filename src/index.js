// To start the gamepad service, the user agent MUST perform the following steps:
import { GamepadService } from "GamepadService.js";

// If |gamepadServiceState| is null:

// NOTE: can be satisfied just having a new gamepad cos this is creating a html page, not creating a browser

// Set |gamepadService| to a new {{GamepadService}}.
const gamepadService = new GamepadService();

// document.addEventListener("DOMContentLoaded", setup);

// function setup() {
//   document.getElementById("add-gamepad").addEventListener("click", addGamepad);
//   document.getElementById("add-iframe").addEventListener("click", addIframe);
// }

// function addGamepad() {
//   const gamepad = document.createElement("button");
//   gamepad.innerHTML = "button";
//   document.getElementById("gamepads").appendChild(gamepad);
// }

// function addIframe() {
//   const iframe = document.createElement("iframe");
//   iframe.src = "";
//   document.getElementById("iframes").appendChild(iframe);
// }
