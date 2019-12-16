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
  onGamepadConnected (gamepad) {

  }
  onGamepadDisconnected(gamepad) {

  }
}

// When a |consumer| becomes active, the user agent runs the <dfn>consumer becomes active</dfn> steps.
// The steps take the GamepadService as an argument:
function consumerBecomesActive(gamepadService) {
  //  1. Assert: gamepadService is not null.
  console.assert(gamepadService);

  //  1. [=Get values=] of gamepadService["consumerInfoMap"], and then [=list/for each=] |consumerInfo|:
  for (const consumerInfo of gamepadService.consumerInfoMap.values()) {
    // 1. If consumerInfo["isActive"] is true,
    if (consumerInfo.isActive) {
      // 1. Register with the operating system to receive notifications when gamepads are connected or disconnected.
      // TODO: Actual registration
      // 1. break;
      break;
    }
  }
}

export class ConsumerInfo {
  constructor() {
    this.isActive;
    this.hasGesture = false;
  }
}
