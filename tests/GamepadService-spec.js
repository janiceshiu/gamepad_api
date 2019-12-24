import { Consumer } from "../src/Consumer.js";
import { GamingDevice } from "../src/GamingDevice.js";
import { GamepadButton } from "../src/GamepadButton.js";
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

describe("GamingDevice", () => {
  const gamingDevices = document.createElement("div");
  document.body.append(gamingDevices);

  beforeEach(() => {
    gamingDevices.innerHTML = "";
  });

  afterAll(() => {
    gamingDevices.remove();
  });

  it("can be constructed with default elements ", () => {
    const gamingDevice = new GamingDevice();

    expect(gamingDevice).toBeTruthy();

    expect(gamingDevice).toBeTruthy();
    expect(Number.isInteger(gamingDevice.id)).toBe(true);
    expect(Number.isInteger(gamingDevice.index)).toBe(true);
    expect(gamingDevice.connected).toBe(false);
    expect(gamingDevice.mapping).toEqual([]);
    expect(gamingDevice.axes).toEqual([0.0, 0.0, 0.0, 0.0]);
    expect(gamingDevice.buttons.length).toEqual(16);
  });

  it("can be constructed with default attributes and attached to a html element ", () => {
    const gamepadDevice = GamingDevice.attachGamingDevice(gamingDevices);

    expect(gamepadDevice.parentElement).toBe(gamingDevices);

    expect(gamepadDevice).toBeTruthy();
    expect(Number.isInteger(gamepadDevice.id)).toBe(true);
    expect(Number.isInteger(gamepadDevice.index)).toBe(true);
    expect(gamepadDevice.connected).toBe(false);
    expect(gamepadDevice.mapping).toEqual([]);
    expect(gamepadDevice.axes).toEqual([0.0, 0.0, 0.0, 0.0]);
    expect(gamepadDevice.buttons.length).toEqual(16);
  });

  it("is an extended HTMLDivElement", () => {
    const gamingDevice = new GamingDevice();

    expect(gamingDevice.tagName).toEqual("DIV");
  });
});

describe("GamepadButton", () => {
  it("can be constructed with default GamepadButton attributes", () => {
    const button = new GamepadButton();

    expect(button).toBeTruthy();
    expect(button.pressed).toBe(false);
    expect(button.touched).toBe(false);
    expect(button.value).toBe(0.0);
  });

  it("is an extended HTMLButtonElement", () => {
    const button = new GamepadButton();

    expect(button.tagName).toEqual("BUTTON");
  });
});
