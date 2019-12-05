// Source: https://docs.google.com/document/d/17lHH6AA-OHDMZEdIbwCRPJsLCY5idrCl774mJiOVHpY/edit @ 1pm UTC +8 05 Dec 2019

// Gamepad service

// The gamepad service monitors the system for device connections and
// disconnections and notifies gamepad consumers. The service also fetches the
// current state of connected gamepads.


// interface GamepadServiceState {
//   maplike<Consumer, ConsumerInfo> consumerInfoMap;
//   maplike<Consumer, sequence<GamepadInfo?>> inactiveConsumerMap;
//   sequence<GamepadInfo?> connectedGamepads;
// };

// dictionary ConsumerInfo {
//   // True if the consumer is eligible to receive connection events.
//   boolean isActive;
//   // True if a gamepad button press was observed while this consumer was active.
//   boolean hasGesture = false;
// };

// dictionary GamepadInfo {
//   // A string identifying the gamepad. The exact form is UA-specific.
//   DOMString id;
//   DOMString mapping;

//   // The last-received button and axis state.
//   sequence<GamepadButton> buttonState;
//   Array<double> axisState;

//   // The timestamp of the last-received update, or 0 if no data has been received.
//   DOMHighResTimestamp timestamp;
// };

function startGamepadService() {
  // To start the gamepad service, the user agent MUST perform the following steps:
  if (gamepadServiceState === null) { // 1. If gamepadServiceState is null:
    gamepadServiceState = new GamepadServiceState() // 1.1 Initialize gamepadServiceState to a new instance of GamepadServiceState.
  }
}

class GamepadServiceState {
  constructor(){
    this.consumerInfoMap = new Map(); // 1.2 Initialize gamepadServiceState.consumerInfoMap to an empty map.
    this.inactiveConsumerMap = new Map(); // 1.3 Initialize gamepadServiceState.inactiveConsumerMap to an empty map.
    this.connectedGamepads = []; // 1.4 Initialize gamepadServiceState.connectedGamepads to an empty sequence of {{GamepadInfo}}
  }
}

// --- section break --- //

// Todo: define “becomes active”.

class ConsumerInfo {
  constructor() {
    this.hasGesture = false; // 4.2. Initialize consumerInfo.hasGesture to false.
    this.isActive = true //  4.3. Set consumerInfo.isActive to true.
  }

}
function gamepadConsumerBecomesActive(gamepadServiceState) {
  // When a gamepad |consumer| becomes active, the user agent MUST perform the following steps:
  // HELP: where and what is consumer?

  gamepadInfo = "temp" // 1. Let |gamepadInfo| be information provided by the operating system about the connected gamepad.

  if (noActiveConsumer(gamepadServiceState)) { // 2. If |consumerInfoMap| contains no ConsumerInfo with isActive==true
    // 3. Register with the operating system to receive notifications when gamepads are connected or disconnected.
    // HELP: not sure how to do this
  }

  function noActiveConsumer(gamepadServiceState) {
    // HELP: which consumer info are we using i'm confused now. only check 1 consumer for the 1 service state?
    // 2. If |consumerInfoMap| contains no ConsumerInfo with isActive==true
    return gamepadServiceState.consumerInfoMap.isActive === true;
  }

  // HELP: i'm really confused as to who consumer info is.
  // not sure whether this variable is referring to the correct things
  consumerInfo = gamepadServiceState.consumerInfoMap.consumer // 3. Let |consumerInfo| be consumerInfoMap[consumer], or null if the key is not found in the map.

  if (consumerInfo === null) { //  4. If |consumerInfo| is null:
    consumerInfo = new ConsumerInfo()//    4.1. Let consumerInfo be a new instance of ConsumerInfo.
  }

  // HELP: can this be clearer? eg: instad of `inactiveConsumerMap`, say gamepadServiceState.inactiveConsumerMap. cos otherwise it's hard to tell whether it's a standalone variable or a key from some other map/obj
  // HELP: again - is `consumer` a fixed key or is it something that changes with each gamepad?
  lastConnectedGamepads = gamepadServiceState.inactiveConsumerMap[consumer] // 5. Let |lastConnectedGamepads| be inactiveConsumerMap[consumer], or null if the key is not found in the map.

  if (lastConnectedGamepads !== null) { // 6.  If lastConnectedGamepads is not null:
    // 6.1 Remove the entry with key consumer from inactiveConsumerMap.
    // HELP: okay this sounds like a specifc key that varies from gamepad to gamepad. eg: the key is `123` for my gamepad and `456 for marcos' gamepad. not sure though
    // HELP: really need to define consumer SOMEWHERE. this is gonna break
    gamepadServiceState.inactiveConsumerMap.delete(consumer)
  }

  if (consumerInfo.hasGesture === true) { // 6.2 If consumerInfo.hasGesture is true:
    for (gamepad in gamepadServiceState.connectedGamepads) { // 6.2.1 For each gamepad in connectedGamepads:

      /*
      1. If gamepad is in lastConnectedGamepads but not connectedGamepads      // 1. Dispatch gamepadconnected for gamepad on consumer (window?).
       1. If gamepad is in connectedGamepads but not lastConnectedGamepads:
         1. Dispatch gamepaddisconnected for gamepad on consumer.
      */

      /*
      HELP: the above is a bit confusing. also, there are 4 cases and spec only covers 2

      case | in lastConnectedGamepads | in connectedGamepads |
      1 | x | x |
      2 | x | o |
      3 | o | x |
      4 | o | o |

      // we can ignore case 4. but what about case 1?
      */
    }
  }
}

// --- section break --- //

function gamepadConsumerBecomesInactive(gamepadServiceState) {
  // When a gamepad consumer becomes inactive, the user agent MUST perform the following steps:

    // HELP: who/what is consumer?
    consumerInfo = gamepadServiceState.consumerInfoMap[consumer] // 1. Let |consumerInfo| = consumerInfoMap[consumer].

    consumerInfo.isActive = false; // 2. Set |consumerInfo|.isActive = false.

    /*
    HELP: what does `be a copy mean`? is it:
    * deep copy - make an entirely new clone of connectedGamepads. both variables reference different memory locations
    * shallow copy - `gamepadServiceState.connectedGamepads` and `lastConnectedGamepads` reference the same memory location

    also - any concerns around references being lost, etc?
    */
    lastConnectedGamepads = gamepadServiceState() // 3. Let |lastConnectedGamepads| be a copy of connectedGamepads.

    // HELP: again - what is key `consumer`?
    // 4. Insert |lastConnectedGamepads| into |inactiveConsumerMap| with key consumer.
    // HELP: ok i'm not sure how to do this
}

// --- section break --- //

function removeGamepadConsumer(gamepadServiceState) {
  // When a gamepad consumer is removed, the user agent MUST perform the following steps:

  // HELP: need to clarify what is key `consumer` first before I can go further
  gamepadServiceState.consumerInfoMap.delete(consumer) // 1. Delete the map entry in consumerInfoMap with the consumer as its key.
  // HELP: do we care if for whatever reason this consumer key isn't in consumerInfoMap?

  // 2. If consumer is a key in inactiveConsumerMap:
  // 2.1 Delete the map entry in inactiveConsumerMap with consumer as its key.
  // note: JS returns `false` if the key to delete isn't in the map. so we don't have to do the `if key exists, then only try to delete it` check.
  // HELP: okay to do this?
  gamepadServiceState.inactiveConsumerMap.delete(consumer)
}

class Button {
  constructor() {
    this.value = 0.0, // 5.1 Initialize button.value to 0.0.
    this.pressed = false // 5.2 Initialize button.pressed to false.
  }
}

class gamepadInfo {
  constructor(buttonCount, axisCount){
    this.id = "gamepad_1", // 2. Let gamepadInfo.id be a string identifying the gamepad
    this.buttonState = new Array(buttonCount) // 4. Initialize gamepadInfo.buttonState to a new sequence<GamepadButton> with length buttonCount.

    // move into an initialiseButtons() fn?
    for (button in buttonState) { // 5. For each button in gamepadInfo.buttonState:
      button = new Button();
    }
  }
}

function gamepadConnectedToTheSystem() {
  // When the gamepad service is notified that a gamepad has been connected to the system, the user agent MUST perform the following steps:

  gamepadInfo = new GamepadInfo(buttonCount) // 1. Let |gamepadInfo| be a new {{GamepadInfo}} object.
  buttonCount = 5 // 3. Let |buttonCount| be the number of buttons on the gamepad.
  axisCount = 2 // 6. Let |axisCount| be the number of axes on the gamepad

  this.axisState = new Array(axisCount) // 7. Initialize gamepadInfo.axisState to a new Array<double> with length axisCount.

  // move into an initialiseAxes() fn? // also - plural of axis = axes
  for (axis in axisState) { // 8. For each axis in gamepadInfo.axisState:
    axis = 0.0 // 8.1 Initialize axis to 0.0.
  }

    // check whether this fits the typdef @ https://www.w3.org/TR/hr-time/#dom-domhighrestimestamp
    this.timestamp = Date.now() // 9. Initialize gamepadInfo.timestamp to a DOMHighResTimeStamp value representing the current time.
    this.mapping = "" // 10. Initialize gamepadInfo.mapping to an empty string.

    // HELP: ???
    //  1. If the gamepad is recognized by the user agent and the user agent has reordered buttons and axes to match the Standard Gamepad:
    //    1. Set gamepadInfo.mapping to "standard".
    //  1. Let |gamepadIndex| be the index of the first null entry in connectedGamepads, starting at index 0.
    //    1. If there are no null entries in connectedGamepads, extend the length of the vector by 1 and let gamepadIndex be the index of the last item.
    //  1. Set connectedGamepads[gamepadIndex] = gamepadInfo.
    //  1. For each consumer, consumerInfo in consumerInfoMap:
    //    1. If consumerInfo.isActive and consumerInfo.hasGesture are both true:
    //      1. Notify the consumer about the connected gamepad (TODO)
}

// --- section break --- //

function gamepadDisconnectedFromTheSystem() {
  // When the gamepad service is notified that a gamepad has been disconnected from the system, the user agent MUST perform the following steps:

  now = Date.now(); // Let |now| be a DOMHighResTimeStamp value representing the current time.

  // HELP: how do i get the `gamepad` object? self? get by ID?
  gamepad = {index: 1} // 2. Let |gamepad| be the item in connectedGamepads representing the disconnected gamepad.

  gamepadServiceState.connectedGamepads[gamepad.index] = null;
  // 3. Set connectedGamepads[gamepad.index] = null.

  // HELP: how to get each consumer. still confused with consumer
  //  4. For each consumer, consumerInfo in consumerInfoMap:

  if (gamepadServiceState.consumerInfo.isActive === true && gamepadServiceState.consumerInfo.hasGesture === true) {
    // HELP: is this `consumerInfo` from `gamepadServiceState` or from somewhere else?
    // 4.1. If consumerInfo.isActive and consumerInfo.hasGesture are both true:

    /*
    HELP: what does `be a copy mean`? is it:
    * deep copy - make an entirely new clone of `gamepad`. both variables reference different memory locations
    * shallow copy - `gamepad` and `eventGamepad` reference the same memory location

    also - any concerns around references being lost, etc?
    */
    // 4.1.1 Let |eventGamepad| be a copy of gamepad.
    eventGamepad = gamepad;

    // HELP: more concerns around deep/shallow copy here. also what's the different between different timestamp keys in different objects?
    // HELP: how to get PerformanceTiming?
    eventGamepad.timestamp = (performanceTiming.navigationStart - now); // 4.1.2. Set eventGamepad.timestamp to the elapsed duration between the navigationStart attribute of the PerformanceTiming interface and now.

    // 4.1.3. Dispatch gamepaddisconnected for eventGamepad on consumer.
    // not sure how to do this. also who is the consumer? window? navigator?
  }
}

// --- section break --- //

function newDataFromGamepad() {
  // When the gamepad service is notified that new data has been received from a gamepad, the user agent MUST perform the following steps:

  now = Date.now(); // 1. Let |now| be a DOMHighResTimeStamp value representing the current time.

  // HELP: again - how to do I get the gamepad?
  gamepad = {} // 2. Let |gamepad| be the item in connectedGamepads representing the gamepad that uploaded new data.

  // HELP: where do we use this variable?
  // TODO: once I figure out where gamepad comes from
  buttonState = "do_something" // 3. Let |buttonState| be the state of all buttons on the gamepad.
}
