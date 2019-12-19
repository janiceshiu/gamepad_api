export class GamepadService {
  constructor() {
    this.consumers = new Set();
    this.connectedGamepads = [];
  }
}
