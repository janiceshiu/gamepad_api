import { Consumer } from "./Consumer.js";
import { GamingDevice } from "./GamingDevice.js";

document.addEventListener("DOMContentLoaded", () => {
  const consumersDiv = document.getElementById("consumers");
  document.getElementById("add-consumer").addEventListener("click", () => {
    Consumer.attachConsumer(consumersDiv);
  });

  const gamingDevicesDiv = document.getElementById("gaming-devices");
  document.getElementById("add-gaming-device").addEventListener("click", () => {
    GamingDevice.attachGamingDevice(gamingDevicesDiv);
  });
});
