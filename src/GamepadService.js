/*
The gamepad service monitors the system for device connections and
disconnections and notifies gamepad consumers. The service also fetches the
current state of connected gamepads.

interface GamepadService {
  maplike<Consumer, ConsumerInfo> consumerInfoMap;
  sequence<GamepadInfo?> connectedGamepads;
};
*/

export class GamepadService {
  constructor() {
    this.consumers = new Set();
    this.connectedGamepads = [];
  }

  activateConsumer(consumer) {
    //  1. Assert: gamepadService is not null.
    //  console.assert(this); // not needed because gamepadService is calling this function and thus can't be null?
    //  1. Let consumers be gamepadService["consumers"]
    const { consumers } = this;
    //  1. [=list/for each=] |consumer| of gamepadService["consumers"]:
    for (const c of consumers) {
      // 1. If |consumer|'s {{Consumer/isActive}} is true,
      if (c.isActive) {
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
    consumer.contentWindow.document.body.classList.toggle("active");

  }

  deactivateConsumer(consumer) {
    // TODO: implement steps from gamepadService algos
    event.target.isActive = false;
    event.target.contentWindow.document.body.classList.toggle("active");
  }
}
