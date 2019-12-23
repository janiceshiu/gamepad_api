let gamepadId = 0;

import { GamepadButton } from "./GamepadButton.js";

export class Gamepad extends HTMLDivElement {
  constructor() {
    super();

    const id = gamepadId++;

    // setup the gamepad's front end
    this.innerHTML = `
      <style>
        .gamepad {
          border: 1px solid grey;
          display: inline-block;
          margin: 5px;
        }
      </style>
      Hello gamepad ${id}!
    `;
    this.classList.add("gamepad");

    // set default attributes
    this._id = id;
    this._index = 0; // temporary value for now
    this._connected = false;
    this._timestamp = new Date().getTime();
    this._mapping = []; // temporary value for now
    this._axes = [0.0, 0.0, 0.0, 0.0];
    this._buttons = []; // temporary value for now
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

  static attachGamepad(htmlElement) {
    const g = new Gamepad();
    htmlElement.append(g);

    return g;
  }
}

customElements.define("gamepad-gamepad", Gamepad, { extends: "div" });
