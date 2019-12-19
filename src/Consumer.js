/**
<dfn>Consumer</dfn>
 ?? iframe
 ?? popup window
 ?? browser tabs
    (Window)

A window can have multiple consumers if it has a cross-origin iframe that is also a [=consumer=].

A [=consumer=] <dfn data-for=”consumer”>becomes active</dfn> when it first expresses interest in gamepad data, either by calling navigator.getGamepads() or by registering an event listener for “gamepadconnected” or “gamepaddisconnected”.

A [=consumer=] becomes inactive if it was previously active, but transitions to a state where it is not eligible to receive gamepad data. This can occur if the window becomes [=hidden=].

An inactive [=consumer=] becomes active again if it transitions back to a state where it is eligible to receive gamepad data, for instance by becoming [=visible=] again.

A [=consumer=] is removed if the window hosting the consumer is closed. Both active and inactive consumers may be removed.
*/

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
        this._isActive = !this._isActive;
        this.contentWindow.document.body.classList.toggle("active");
        const event = new CustomEvent("activestatechange");
        this.dispatchEvent(event);
      });
       get isActive() {
          return this._isActive;
       }
    });
  }
  // TODO: disconnect/connect registration as per activation algorithm" or similar
  // possible function signatures could be `onGamepadConnected(gamepad)` and `onGamepadDisconnected(gamepad)`

  static attachConsumer(htmlElement) {
    const c = new Consumer();
    htmlElement.append(c);

    return c;
  }
}

customElements.define("gamepad-consumer", Consumer, { extends: "iframe" });
