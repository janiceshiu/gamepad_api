import { Consumer } from "./Consumer.js";

document.addEventListener("DOMContentLoaded", () => {
  const consumersDiv = document.getElementById("consumers");
  document.getElementById("add-consumer").addEventListener("click", () => {
    Consumer.attachConsumer(consumersDiv);
  });
});
