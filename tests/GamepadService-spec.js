import { Consumer } from "../src/Consumer.js";
import { GamepadService } from "../src/GamepadService.js";

describe("GamepadService", () => {
  it("can be constructed", () => {
    expect(new GamepadService()).toBeTruthy();
  });


});

describe("Consumer", () => {
  it("can be constructed with default attributes", () => {
    const consumer = new Consumer();

    expect(consumer).toBeTruthy();
    expect(consumer.isActive).toBe(false);
    expect(consumer.hasGesture).toBe(false);
  });

  it("can be constructed with default attributes and attached to a html element", async () => {
    const consumers = document.createElement("div");
    consumers.id = "consumers";
    document.body.append(consumers);

    const consumer = Consumer.attachConsumer(consumers);

    await new Promise(resolve => {
      consumer.onload = resolve;
    });

    expect(consumer.parentElement.id).toBe("consumers");
    expect(consumer.id).toContain("consumer-");
    expect(consumer.isActive).toBe(false);
    expect(consumer.hasGesture).toBe(false);
  });

  it("can activate itself", async() => {
    const consumers = document.createElement("div");
    document.body.append(consumers);

    const consumer = Consumer.attachConsumer(consumers);

    await new Promise(resolve => {
      consumer.onload = resolve;
    });

    expect(consumer.isActive).toBe(false);
    expect(consumer.hasGesture).toBe(false);

    consumer.setActiveState();

    expect(consumer.isActive).toBe(true);
    expect(consumer.hasGesture).toBe(false);
  });

  it("can deactivate itself", async() => {
    const consumers = document.createElement("div");
    document.body.append(consumers);

    const consumer = Consumer.attachConsumer(consumers);
    consumer.setActiveState();

    await new Promise(resolve => {
      consumer.onload = resolve;
    });

    expect(consumer.isActive).toBe(true);
    expect(consumer.hasGesture).toBe(false);

    consumer.setActiveState();

    expect(consumer.isActive).toBe(false);
    expect(consumer.hasGesture).toBe(false);
  });
});
