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

export class Consumer {
  // TODO: disconnect/connect registration as per activation algorithm" or similar
  // possible function signatures could be `onGamepadConnected(gamepad)` and `onGamepadDisconnected(gamepad)`
}

// When a |consumer| becomes active, the user agent runs the <dfn>consumer becomes active</dfn> steps.
// The steps take the GamepadService as an argument:
function consumerBecomesActive(gamepadService, consumer) {
  //  1. Assert: gamepadService is not null.
  console.assert(gamepadService);
  //  1. Let consumerInfoMap be gamepadService["consumerInfoMap"]
  const { consumerInfoMap } = gamepadService;
  //  1. [=Get values=] of gamepadService["consumerInfoMap"], and then [=list/for each=] |consumerInfo|:
  for (const consumerInfo of consumerInfoMap.values()) {
    // 1. If consumerInfo["isActive"] is true,
    if (consumerInfo.isActive) {
      // 1. Register with the operating system to receive notifications when gamepads are connected or disconnected.
      // TODO: Actual registration
      // 1. break;
      break;
    }
  }

  // 1. Let |consumerInfo| be null.
  let consumerInfo = null;

  // 1. If consumerInfoMap[consumer] exists, then:
  if (consumerInfoMap.has(consumer)) {
    // 1. Set |consumerInfo| to consumerInfoMap[consumer].
    consumerInfo = consumerInfoMap.get(consumer);
    // 1. Otherwise:
  } else {
    // 1. Set |consumerInfo| to a new {{ConsumerInfo}}.
    consumerInfo = new ConsumerInfo();
    // 1. Set consumerInfoMap[consumer] to |consumerInfo|.
    consumerInfoMap.set(consumer, consumerInfo);
  }

  // consumerInfo.isActive ??? true or (undefined or false).

  // If this consumer was previously active,
  if (consumerInfo.isActive) {
    // TODO: check if we should dispatch connection events.
  }
  // 1. Set |consumerInfo|'s {{ConsumerInfo/isActive}} member to true.
  consumerInfo.isActive = true;
}

export class ConsumerInfo {
  constructor() {
    this.isActive; // check whether can default to false
    this.hasGesture = false;
  }
}
