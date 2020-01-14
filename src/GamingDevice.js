import { GamingDeviceButton } from "./GamingDeviceButton.js";

let gamingDeviceId = 0;
const defaultNumOfButtons = 18;

export class GamingDevice extends HTMLDivElement {
  constructor(numOfButtons = defaultNumOfButtons) {
    super();

    // set default attributes
    this._id = gamingDeviceId++;
    this._isConnected = false;
    this._buttons = gamingDeviceButtons();

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
      Hello gamepad ${this.id}!
    `;
    this.classList.add("gaming-device");

    addButtonsToButtonDiv(this);

    function gamingDeviceButtons() {
      const buttons = Array(numOfButtons)
        .fill()
        .map((_, i) => new GamingDeviceButton(i));

      return Object.freeze(buttons);
    }

    function addButtonsToButtonDiv(gamingDevice) {
      const buttonsDiv = document.createElement("div");
      buttonsDiv.id = `gaming-device-${gamingDevice.id}-buttons`;

      gamingDevice.buttons.map(b => buttonsDiv.append(b));
      gamingDevice.append(buttonsDiv);
    }
  }

  connect() {
    this._isConnected = true;
    this.classList.add("connected");
  }

  get id() {
    return this._id;
  }

  get isConnected() {
    return this._isConnected;
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
