document.addEventListener("DOMContentLoaded", setup);

function setup() {
  document.getElementById("add-gamepad").addEventListener("click", addGamepad);
  document.getElementById("add-iframe").addEventListener("click", addIframe);
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
