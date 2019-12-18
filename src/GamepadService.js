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

  // When a |consumer| becomes inactive, the user agent runs the <dfn>consumer becomes inactive</dfn> steps.
  // The steps take the GamepadService |gamepadService| and the  |consumer| as an argument:
  deactivateConsumer(consumer) {
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
    // toggle consumer's background color
    consumer.contentWindow.document.body.classList.toggle("active");

    // algo from google doc
    // Check if there are still active consumers.
    //  1. Let |hasActiveConsumer| be false.
    //  1. For each |consumer| -> |consumerInfo| of |consumerInfoMap|:
    //    1. If consumerInfo["isActive"] is false, then set |hasActiveConsumer| to true.
    //  1. If |hasActiveConsumer| is false, then:
    //    1. Unregister with the operating system to no longer receive notifications with gamepads are connected or disconnected.

    // MODIFIED ALGO
    //  1. Let consumers be gamepadService["consumers"]
    const { consumers } = this;

    // 1. Let |hasActiveConsumer| be false;
    let hasActiveConsumer = false;
    //  1. [=list/for each=] |consumer| of gamepadService["consumers"]:
    for (const c of consumers) {
      // if consumer["isActive"] is true, then set |hasActiveConsumer| to true.
      if (c.isActive) {
        hasActiveConsumer = true;
        // break
        break;
      }

      // 1. If no |consumer|'s {{Consumer/isActive}} is true,
      if (!hasActiveConsumer) {
        // 1. TODO: Unregister with the operating system to no longer receive notifications with gamepads are connected or disconnected.
      }
    }
  }
}
