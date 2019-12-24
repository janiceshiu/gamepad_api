export class GamingDeviceButton extends HTMLButtonElement {
  constructor() {
    super();

    // set default attributes
    this._pressed = false;
    this._touched = false;
    this._value = 0.0;
  }

  get pressed() {
    return this._pressed;
  }

  get touched() {
    return this._touched;
  }

  get value() {
    return this._value;
  }
}

customElements.define("gamepad-button", GamingDeviceButton, {
  extends: "button"
});
