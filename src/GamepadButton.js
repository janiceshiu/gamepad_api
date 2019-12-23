export class GamepadButton extends HTMLButtonElement {
  constructor() {
    super();
  }
}

customElements.define("gamepad-button", GamepadButton, { extends: "button" });
