document.addEventListener("DOMContentLoaded", event => {
  setup();
});

function setup() {
  document.getElementById("add-gamepad").addEventListener("click", () => {
    addGamepad();
  });

  document.getElementById("add-iframe").addEventListener("click", () => {
    addIframe();
  });
}

function addGamepad() {
  const gamepad = document.createElement("button");
  gamepad.innerHTML = "button";
  document.getElementById("gamepads").appendChild(gamepad);
}

function addIframe() {
  const iframe = document.createElement("iframe");
  iframe.src = "";
  document.getElementById("iframes").appendChild(iframe);
}

// This singleton is for the entire user agent
// let gamepadService = {
//   connectedGamepads = [] // sequences of gamepadInfos
// } GamepadService {
//   maplike<Consumer, ConsumerInfo> consumerInfoMap;
// };

// Consumer is kinda Window and “environment settings object”

// Create a consumer class.
// Create buttons to dynamically add and remove gamepads (do any default setup here)
// Create buttons to dynamically add and remove iframes (do any default setup here)
// Associate gamepads and iframes
// Send events to various gamepads and iframes
