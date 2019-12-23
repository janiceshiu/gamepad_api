let gamepadId = 0;

export class Gamepad extends HTMLElement {
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
  }

  static attachGamepad(htmlElement) {
    const g = new Gamepad();
    htmlElement.append(g);

    return g;
  }
}

customElements.define("gamepad-gamepad", Gamepad);
