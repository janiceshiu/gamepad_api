import { Consumer } from "../src/Consumer.js";
import { Gamepad } from "../src/Gamepad.js";
import { GamepadService } from "../src/GamepadService.js";

describe("GamepadService", () => {
  it("can be constructed", () => {
    expect(new GamepadService()).toBeTruthy();
  });
});

describe("Consumer", () => {
  const consumers = document.createElement("div");
  document.body.append(consumers);

  beforeEach(() => {
    consumers.innerHTML = "";
  });

  afterAll(() => {
    consumers.remove();
  });

  it("toggles a consumer's isActive when consumer is clicked", async () => {
    const consumer = Consumer.attachConsumer(consumers);

    await new Promise(resolve => {
      consumer.onload = resolve;
    });

    expect(consumer.isActive).toBe(false);
    expect(consumer.hasGesture).toBe(false);

    const clickPromise = new Promise(resolve => {
      consumer.contentDocument.onclick = resolve;
    });
    consumer.contentDocument.body.click();
    await clickPromise;

    expect(consumer.isActive).toBe(true);
    expect(consumer.hasGesture).toBe(false);
  });

  it("can be constructed with default attributes", () => {
    const consumer = new Consumer();

    expect(consumer).toBeTruthy();
    expect(consumer.isActive).toBe(false);
    expect(consumer.hasGesture).toBe(false);
  });

  it("can be constructed with default attributes and attached to a html element", async () => {
    const consumer = Consumer.attachConsumer(consumers);

    await new Promise(resolve => {
      consumer.onload = resolve;
    });

    expect(consumer.parentElement).toBe(consumers);
    expect(consumer.id).toContain("consumer-");
    expect(consumer.isActive).toBe(false);
    expect(consumer.hasGesture).toBe(false);
  });

  it("can activate itself", async () => {
    const consumer = Consumer.attachConsumer(consumers);

    await new Promise(resolve => {
      consumer.onload = resolve;
    });

    expect(consumer.isActive).toBe(false);
    expect(consumer.hasGesture).toBe(false);

    consumer.toggleActiveState();

    expect(consumer.isActive).toBe(true);
    expect(consumer.hasGesture).toBe(false);
  });

  it("can deactivate itself", async () => {
    const consumer = Consumer.attachConsumer(consumers);

    await new Promise(resolve => {
      consumer.onload = resolve;
    });
    consumer.toggleActiveState();

    expect(consumer.isActive).toBe(true);
    expect(consumer.hasGesture).toBe(false);

    consumer.toggleActiveState();

    expect(consumer.isActive).toBe(false);
    expect(consumer.hasGesture).toBe(false);
  });

  it("fires an `activestatechange` event when consumer.toggleActiveState() is called", async () => {
    const consumer = Consumer.attachConsumer(consumers);

    await new Promise(resolve => {
      consumer.onload = resolve;
    });

    expect(consumer.isActive).toBe(false);

    const toggleActiveStatePromise = new Promise(resolve => {
      consumer.addEventListener("activestatechange", resolve);
    });
    consumer.toggleActiveState();
    await toggleActiveStatePromise;

    expect(consumer.isActive).toBe(true);
    expect(consumer.hasGesture).toBe(false);
  });
});

describe("Gamepad", () => {
  const gamepads = document.createElement("div");
  document.body.append(gamepads);

  beforeEach(() => {
    gamepads.innerHTML = "";
  });

  afterAll(() => {
    gamepads.remove();
  });

  it("can be constructed ", () => {
    const gamepad = new Gamepad();

    expect(gamepad).toBeTruthy();
  });

  it("can be constructed with default attributes and attached to a html element ", () => {
    const gamepad = Gamepad.attachGamepad(gamepads);

    expect(gamepad.parentElement).toBe(gamepads);
  });
});
