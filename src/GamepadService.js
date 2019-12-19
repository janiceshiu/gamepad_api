export class GamepadService {
  constructor() {
    this.consumers = new Set();
    this.connectedGamepads = [];
  }

  activateConsumer(consumer) {
    const { consumers } = this;
    for (const c of consumers) {
      if (c.isActive) {
        // 1. Register with the operating system to receive notifications when gamepads are connected or disconnected.
        // TODO: Actual registration
        break;
      }
    }

    if (!consumers.has(consumer)) {
      consumers.add(consumer);
    }
  }

  deactivateConsumer(consumer) {
    const { consumers } = this;

    let hasActiveConsumer = false;

    for (const c of consumers) {
      if (c.isActive) {
        hasActiveConsumer = true;
        break;
      }

      if (!hasActiveConsumer) {
        // 1. TODO: Unregister with the operating system to no longer receive notifications with gamepads are connected or disconnected.
      }
    }
  }
}
