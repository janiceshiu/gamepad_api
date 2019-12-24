let gamingDeviceId = 0;

import { GamepadButton } from "./GamepadButton.js";

export class GamingDevice extends HTMLDivElement {
  constructor() {
    super();

    const id = gamingDeviceId++;

    // setup the gamepad's front end
    this.innerHTML = `
      <style>
        .gaming-device {
          border: 1px solid grey;
          display: inline-block;
          margin: 5px;
        }
      </style>
      Hello gamepad ${id}!
    `;
    this.classList.add("gaming-device");

    // set default attributes
    this._id = id;
    this._index = 0; // temporary value for now
    this._connected = false;
    this._timestamp = new Date().getTime();
    this._mapping = []; // temporary value for now
    this._axes = [0.0, 0.0, 0.0, 0.0];
    this._buttons = gamepadButtons();

    function gamepadButtons() {
      const buttons = Array(16)
        .fill(undefined)
        .map(x => new GamepadButton());

      return Object.freeze(buttons);
    }
  }

  get id() {
    return this._id;
  }

  get index() {
    return this._index;
  }

  get connected() {
    return this._connected;
  }

  get timestamp() {
    return this._timestamp;
  }

  get mapping() {
    return this._mapping;
  }

  get axes() {
    return this._axes;
  }

  get buttons() {
    return this._buttons;
  }

  static attachGamingDevice(htmlElement) {
    const g = new GamingDevice();
    htmlElement.append(g);

    return g;
  }
}

customElements.define("gaming-device", GamingDevice, { extends: "div" });
