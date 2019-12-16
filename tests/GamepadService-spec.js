import { Consumer, consumerBecomesActive } from "../src/Consumer.js";
import { GamepadService } from "../src/GamepadService.js";

describe("GamepadService", () => {
  it("can be constructed", () => {
    expect(new GamepadService()).toBeTruthy();
  });
});

describe("consumerBecomesActive()", () => {
  it("activates a consumer", () => {
    const service = new GamepadService();
    const consumer = new Consumer();
    consumerBecomesActive(service, consumer);
    const info = service.consumerInfoMap.get(consumer);

    expect(info.isActive).toBe(true);
  });
});
