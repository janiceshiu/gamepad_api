import { Consumer, consumerBecomesActive } from "./Consumer.js";
import { GamepadService } from "./GamepadService.js";

const gamepadService = new GamepadService();

document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("add-consumer")
    .addEventListener("click", addConsumer);
});

export function addConsumer() {
  const c = new Consumer();
  document.getElementById("consumers").appendChild(c);

  addActivateConsumerListener(c);
}

function addActivateConsumerListener(consumer) {
  consumer.addEventListener("load", () => {
    consumer.contentWindow.document
      .getElementById(`activate-${consumer.id}`)
      .addEventListener("click", () => {
        activateConsumer(gamepadService, consumer);
      });
  });
}

function activateConsumer(gamepadService, consumer) {
  consumerBecomesActive(gamepadService, consumer);
}
