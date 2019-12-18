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

    this.srcdoc = `<!doctype html><h1>Hello Consumer ${id}!</h1><button id='activate-consumer-${id}'>Activate Consumer ${id}</button>`;
    this.id = `consumer-${id}`;
  }
  // TODO: disconnect/connect registration as per activation algorithm" or similar
  // possible function signatures could be `onGamepadConnected(gamepad)` and `onGamepadDisconnected(gamepad)`
}

customElements.define("gamepad-consumer", Consumer, { extends: "iframe" });

// When a |consumer| becomes active, the user agent runs the <dfn>consumer becomes active</dfn> steps.
// The steps take the GamepadService |gamepadService| and the  |consumer| as an argument:
export function consumerBecomesActive(gamepadService, consumer) {
  //  1. Assert: gamepadService is not null.
  console.assert(gamepadService);
  //  1. Let consumers be gamepadService["consumers"]
  const { consumers } = gamepadService;
  //  1. [=list/for each=] |consumer| of gamepadService["consumers"]:
  for (const consumer of consumers) {
    // 1. If |consumer|'s {{Consumer/isActive}} is true,
    if (consumer.isActive) {
      // 1. Register with the operating system to receive notifications when gamepads are connected or disconnected.
      // TODO: Actual registration
      // 1. break;
      break;
    }
  }

  // 1. If |consumer| does not exist in |consumers|, then [=set/append=] |consumer| to |consumers|.
  if (!consumers.has(consumer)) {
    consumers.add(consumer);
  }

  // 1. Set |consumer|'s {{Consumer/isActive}} member to `true`.
  consumer.isActive = true;
}
