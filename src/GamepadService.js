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
    this.consumerInfoMap = new Map();
    this.connectedGamepads = [];
  }
}
