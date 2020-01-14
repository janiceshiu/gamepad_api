import { Consumer } from "../src/Consumer.js";
import { GamepadService } from "../src/GamepadService.js";
import { GamingDevice } from "../src/GamingDevice.js";
import { GamingDeviceButton } from "../src/GamingDeviceButton.js";

describe("GamepadService", () => {
  it("is constructed", () => {
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

  it("is constructed with default attributes", () => {
    const consumer = new Consumer();

    expect(consumer).toBeTruthy();
    expect(consumer.isActive).toBe(false);
    expect(consumer.hasGesture).toBe(false);
  });

  it("is constructed with default attributes and attached to a html element", async () => {
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

  it("is constructed with default attributes ", () => {
    const gamingDevice = new GamingDevice();

    expect(gamingDevice).toBeTruthy();

    expect(gamingDevice).toBeTruthy();
    expect(Number.isInteger(gamingDevice.id)).toBe(true);
    expect(gamingDevice.isConnected).toBe(false);
    expect(gamingDevice.buttons.length).toEqual(18);
  });

  it("has the correct number of buttons when number of buttons is specified", () => {
    const gamingDevice = new GamingDevice(10);

    expect(gamingDevice).toBeTruthy();

    expect(gamingDevice).toBeTruthy();
    expect(Number.isInteger(gamingDevice.id)).toBe(true);
    expect(gamingDevice.isConnected).toBe(false);
    expect(gamingDevice.buttons.length).toEqual(10);
  });

  it("is constructed with default attributes and contains the correct html elements", () => {
    const gamepadDevice = GamingDevice.attachGamingDevice(gamingDevices);

    expect(gamepadDevice.parentElement).toBe(gamingDevices);

    expect(gamepadDevice).toBeTruthy();
    expect(Number.isInteger(gamepadDevice.id)).toBe(true);
    expect(gamepadDevice.isConnected).toBe(false);
    expect(gamepadDevice.buttons.length).toEqual(18);
    expect(gamepadDevice.children[1].childElementCount).toEqual(18);
  });

  it("changes its isConnected status to true when any one of its buttons is clicked", () => {
    const gamingDevice = new GamingDevice();

    expect(gamingDevice.isConnected).toEqual(false);

    const buttonIndex = Math.floor(Math.random() * gamingDevice.buttons.length);
    gamingDevice.buttons[buttonIndex].click();

    expect(gamingDevice.isConnected).toEqual(true);
  });

  it("is an extended HTMLDivElement", () => {
    const gamingDevice = new GamingDevice();

    expect(gamingDevice instanceof HTMLDivElement).toBe(true);
  });
});

describe("GamingDeviceButton", () => {
  it("is constructed with default GamingDeviceButton attributes", () => {
    const button = new GamingDeviceButton();

    expect(button).toBeTruthy();
    expect(button.pressed).toBe(false);
    expect(button.touched).toBe(false);
    expect(button.value).toBe(0.0);
  });

  it("is an extended HTMLButtonElement", () => {
    const button = new GamingDeviceButton();

    expect(button instanceof HTMLButtonElement).toBe(true);
  });
});
