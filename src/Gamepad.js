export class Gamepad extends HTMLElement {
  constructor() {
    super();
  }

  static attachGamepad(htmlElement) {
    const g = new Gamepad();
    htmlElement.append(g);

    return g;
  }
}

customElements.define("gamepad-gamepad", Gamepad);
