let consumerId = 0;

export class Consumer extends HTMLIFrameElement {
  constructor() {
    super();

    const id = consumerId++;

    // True if the consumer is eligible to receive connection events.
    // boolean isActive false ;
    this._isActive = false;
    // True if a gamepad button press was observed while this consumer was active.
    // boolean hasGesture = false;
    this.hasGesture = false;

    this.srcdoc = `
      <!doctype html>
      <style>
        body {
          background-color: lightcoral;
        }
        .active {
          background-color: lightblue;
        }
      </style>
      <body><h1>Consumer ${id}!</h1></body>
    `;
    this.id = `consumer-${id}`;

    this.addEventListener("load", () => {
      this.contentWindow.addEventListener("click", () => {
        this.setActiveState();
      });
    });
  }

  get isActive() {
    return this._isActive;
  }
  // TODO: disconnect/connect registration as per activation algorithm" or similar
  // possible function signatures could be `onGamepadConnected(gamepad)` and `onGamepadDisconnected(gamepad)`

  static attachConsumer(htmlElement) {
    const c = new Consumer();
    htmlElement.append(c);

    return c;
  }

  toggleActiveState() {
    this._isActive = !this._isActive;
    this.contentWindow.document.body.classList.toggle("active");
    const event = new CustomEvent("activestatechange");
    this.dispatchEvent(event);
  }
}

customElements.define("gamepad-consumer", Consumer, { extends: "iframe" });
