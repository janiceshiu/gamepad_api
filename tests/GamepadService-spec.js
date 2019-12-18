import { Consumer } from "../src/Consumer.js";
import { GamepadService } from "../src/GamepadService.js";
import { addConsumer } from "../src/index.js";

describe("GamepadService", () => {
  it("can be constructed", () => {
    expect(new GamepadService()).toBeTruthy();
  });
});

describe("Consumer()", () => {
  beforeEach(() => {
    const consumers = document.createElement("div");
    consumers.id = "consumers";
    document.body.appendChild(consumers);

    addConsumer();
    addConsumer();
  });

  it("adds n unique consumers with default attributes to the document when clicked n times", () => {
    const consumer1 = document.getElementById("consumer-1");
    const consumer2 = document.getElementById("consumer-2");

    expect(consumer1.isActive).toBe(false);
    expect(consumer1.hasGesture).toBe(false);

    expect(consumer2.isActive).toBe(false);
    expect(consumer2.hasGesture).toBe(false);
  });

  it("only activates a specific consumer when that consumer's activate consumer button is clicked", () => {
    const consumer1 = document.getElementById("consumer-1");
    const consumer2 = document.getElementById("consumer-2");

    consumer1.contentWindow.document
      .getElementById("activate-consumer-1")
      .click();

    expect(consumer1.isActive).toBe(true);
    expect(consumer1.hasGesture).toBe(false);

    expect(consumer2.isActive).toBe(false);
    expect(consumer2.hasGesture).toBe(false);
  });
});
