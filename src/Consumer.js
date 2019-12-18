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
    this.isActive = false;
    // True if a gamepad button press was observed while this consumer was active.
    // boolean hasGesture = false;
    this.hasGesture = false;

    this.srcdoc = `
      <!doctype html>
      <style>
        body {
            background-color: lightcoral;
          }
        .active { background-color: lightblue }
      </style>
      <body><h1>Consumer ${id}!</h1></body>
    `;
    this.id = `consumer-${id}`;

    this.addEventListener("load", () => {
      this.contentWindow.addEventListener("click", () => {
        const event = new Event("toggleConsumerIsActive", { bubbles: true });
        this.dispatchEvent(event);
      });
    });
  }
  // TODO: disconnect/connect registration as per activation algorithm" or similar
  // possible function signatures could be `onGamepadConnected(gamepad)` and `onGamepadDisconnected(gamepad)`

  static attachConsumer(htmlElement) {
    const c = new Consumer();
    htmlElement.append(c);
  }
}

customElements.define("gamepad-consumer", Consumer, { extends: "iframe" });

// When a |consumer| becomes active, the user agent runs the <dfn>consumer becomes active</dfn> steps.
// The steps take the GamepadService |gamepadService| and the  |consumer| as an argument:
// export function consumerBecomesActive(gamepadService, consumer) {

// }

// When a |consumer| becomes active, the user agent runs the <dfn>consumer becomes inactive</dfn> steps.
// The steps take the GamepadService |gamepadService| and the  |consumer| as an argument:
export function consumerBecomesInactive(gamepadService, consumer) {
  // algo from google doc
  // Mark the consumer inactive and preserve the current state of connected gamepads.
  // 1. Let |consumerInfoMap| be gamepadService["consumerInfoMap"].
  // 1. Let |inactiveConsumerMap| be gamepadService["inactiveConsumerMap"].
  // 1. Let |consumerInfo| be consumerInfoMap[consumer].
  // 1. Set consumerInfo["isActive"] to false.
  // 1. Let |lastConnectedGamepads| be a clone of gamepadService["connectedGamepads"].
  // 1. Set inactiveConsumerMap[consumer] to |lastConnectedGamepads|.

  // MODIFIED ALGO
  // 1. Set |consumer|'s {{Consumer/isActive}} member to `false`.
  consumer.isActive = false;

  // algo from google doc
  // Check if there are still active consumers.
  //  1. Let |hasActiveConsumer| be false.
  //  1. For each |consumer| -> |consumerInfo| of |consumerInfoMap|:
  //    1. If consumerInfo["isActive"] is false, then set |hasActiveConsumer| to true.
  //  1. If |hasActiveConsumer| is false, then:
  //    1. Unregister with the operating system to no longer receive notifications with gamepads are connected or disconnected.

  // MODIFIED ALGO
  //  1. Let consumers be gamepadService["consumers"]
  const { consumers } = gamepadService;

  // 1. Let |hasActiveConsumer| be false;
  let hasActiveConsumer = false;
  //  1. [=list/for each=] |consumer| of gamepadService["consumers"]:
  for (const consumer of consumers) {
    // if consumer["isActive"] is true, then set |hasActiveConsumer| to true.
    if (consumer.isActive) {
      hasActiveConsumer = true;
      // break
      break;
    }

    // 1. If no |consumer|'s {{Consumer/isActive}} is true,
    if (!hasActiveConsumer) {
      // 1. Unregister with the operating system to no longer receive notifications with gamepads are connected or disconnected.
    }
  }
}
