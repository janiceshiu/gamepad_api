document.addEventListener("DOMContentLoaded", function(event) { setup(); });

function setup() {
  document.getElementById("add-gamepad").addEventListener("click", function(){
    addGamepad();
  });

  document.getElementById("add-iframe").addEventListener("click", function(){
    addIframe();
  });
}

function addGamepad() {
  let gamepad = document.createElement('button');
  gamepad.innerHTML = "button"
  document.getElementById("gamepads").appendChild(gamepad);
}

function addIframe() {
  let iframe = document.createElement('iframe');
  iframe.src = "example_url.html";
  document.getElementById("iframes").appendChild(iframe);
}
