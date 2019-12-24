let gamingDeviceId = 0;
const defaultNumOfButtons = 18;

import { GamingDeviceButton } from "./GamingDeviceButton.js";

export class GamingDevice extends HTMLDivElement {
  constructor(numOfButtons = defaultNumOfButtons) {
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
    this._connected = false;
    this._buttons = gamingDeviceButtons();

    function gamingDeviceButtons() {
      const buttons = Array(numOfButtons)
        .fill()
        .map((_, i) => new GamingDeviceButton(i));

      return Object.freeze(buttons);
    }
  }

  get id() {
    return this._id;
  }

  get connected() {
    return this._connected;
  }

  get buttons() {
    return this._buttons;
  }

  static attachGamingDevice(htmlElement, numOfButtons = defaultNumOfButtons) {
    const g = new GamingDevice(numOfButtons);
    htmlElement.append(g);

    return g;
  }
}

customElements.define("gaming-device", GamingDevice, { extends: "div" });
