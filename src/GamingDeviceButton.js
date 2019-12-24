export class GamingDeviceButton extends HTMLButtonElement {
  constructor(buttonNumber) {
    super();

    // set default attributes
    this._pressed = false;
    this._touched = false;
    this._value = 0.0;

    this.innerHTML = `button ${buttonNumber + 1}`;
    this.type = "button";
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
