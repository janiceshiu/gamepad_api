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
        .connected {
          background-color: lightblue;
        }
      </style>
      Hello gamepad ${id}!
    `;
    this.classList.add("gaming-device");

    // set default attributes
    this._id = id;
    this._connected = false;
    this._buttons = gamingDeviceButtons();

    addButtonsToButtonDiv(this);

    function gamingDeviceButtons() {
      const buttons = Array(numOfButtons)
        .fill()
        .map((_, i) => new GamingDeviceButton(i));

      return Object.freeze(buttons);
    }

    function addButtonsToButtonDiv(gamingDevice) {
      const buttonsDiv = document.createElement("div");
      buttonsDiv.id = `gaming-device-${id}-buttons`;

      gamingDevice.buttons.map(b => buttonsDiv.append(b));
      gamingDevice.append(buttonsDiv);
    }
  }

  connect() {
    this._connected = true;
    this.classList.add("connected");
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
