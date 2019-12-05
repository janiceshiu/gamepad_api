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

// To start the gamepad service, the user agent MUST perform the following steps:

//  1. If gamepadServiceState is null:
//    1. Initialize gamepadServiceState to a new instance of GamepadServiceState.
//    1. Initialize gamepadServiceState.consumerInfoMap to an empty map.
//    1. Initialize gamepadServiceState.inactiveConsumerMap to an empty map.
//    1. Initialize gamepadServiceState.connectedGamepads to an empty sequence of {{GamepadInfo}}.

// Todo: define “becomes active”.

// When a gamepad |consumer| becomes active, the user agent MUST perform the following steps:

//  1. Let |gamepadInfo| be information provided by the operating system about the connected gamepad.
//  1. If |consumerInfoMap| contains no ConsumerInfo with isActive==true:
//    1. Register with the operating system to receive notifications when gamepads are connected or disconnected.
//  1. Let |consumerInfo| be consumerInfoMap[consumer], or null if the key is not found in the map.
//  1. If |consumerInfo| is null:
//    1. Let consumerInfo be a new instance of ConsumerInfo.
//    1. Initialize consumerInfo.hasGesture to false.
//  1. Set consumerInfo.isActive to true.
//  1. Let |lastConnectedGamepads| be inactiveConsumerMap[consumer], or null if the key is not found in the map.
//  1. If lastConnectedGamepads is not null:
//    1. Remove the entry with key consumer from inactiveConsumerMap.
//    1. If consumerInfo.hasGesture is true:
//      1. For each gamepad in connectedGamepads:
//        1. If gamepad is in lastConnectedGamepads but not connectedGamepads:
//          1. Dispatch gamepadconnected for gamepad on consumer (window?).
//        1. If gamepad is in connectedGamepads but not lastConnectedGamepads:
//          1. Dispatch gamepaddisconnected for gamepad on consumer.

// When a gamepad consumer becomes inactive, the user agent MUST perform the following steps:

//  1. Let |consumerInfo| = consumerInfoMap[consumer].
//  1. Set |consumerInfo|.isActive = false.
//  1. Let |lastConnectedGamepads| be a copy of connectedGamepads.
//  1. Insert |lastConnectedGamepads| into |inactiveConsumerMap| with key consumer.

// When a gamepad consumer is removed, the user agent MUST perform the following steps:

//  1. Delete the map entry in consumerInfoMap with the consumer as its key.
//  1. If consumer is a key in inactiveConsumerMap:
//    1. Delete the map entry in inactiveConsumerMap with consumer as its key.

// When the gamepad service is notified that a gamepad has been connected to the system, the user agent MUST perform the following steps:

//  1. Let |gamepadInfo| be a new {{GamepadInfo}} object.
//  1. Let gamepadInfo.id be a string identifying the gamepad.
//  1. Let |buttonCount| be the number of buttons on the gamepad.
//  1. Initialize gamepadInfo.buttonState to a new sequence<GamepadButton> with length buttonCount.
//  1. For each button in gamepadInfo.buttonState:
//    1. Initialize button.value to 0.0.
//    1. Initialize button.pressed to false.
//  1. Let |axisCount| be the number of axes on the gamepad.
//  1. Initialize gamepadInfo.axisState to a new Array<double> with length axisCount.
//  1. For each axis in gamepadInfo.axisState:
//    1. Initialize axis to 0.0.
//  1. Initialize gamepadInfo.timestamp to a DOMHighResTimeStamp value representing the current time.
//  1. Initialize gamepadInfo.mapping to an empty string.
//  1. If the gamepad is recognized by the user agent and the user agent has reordered buttons and axes to match the Standard Gamepad:
//    1. Set gamepadInfo.mapping to "standard".
//  1. Let |gamepadIndex| be the index of the first null entry in connectedGamepads, starting at index 0.
//    1. If there are no null entries in connectedGamepads, extend the length of the vector by 1 and let gamepadIndex be the index of the last item.
//  1. Set connectedGamepads[gamepadIndex] = gamepadInfo.
//  1. For each consumer, consumerInfo in consumerInfoMap:
//    1. If consumerInfo.isActive and consumerInfo.hasGesture are both true:
//      1. Notify the consumer about the connected gamepad (TODO)

// When the gamepad service is notified that a gamepad has been disconnected from the system, the user agent MUST perform the following steps:

//  1. Let |now| be a DOMHighResTimeStamp value representing the current time.
//  1. Let |gamepad| be the item in connectedGamepads representing the disconnected gamepad.
//  1. Set connectedGamepads[gamepad.index] = null.
//  1. For each consumer, consumerInfo in consumerInfoMap:
//    1. If consumerInfo.isActive and consumerInfo.hasGesture are both true:
//      1. Let |eventGamepad| be a copy of gamepad.
//      1. Set eventGamepad.timestamp to the elapsed duration between the navigationStart attribute of the PerformanceTiming interface and now.
//      1. Dispatch gamepaddisconnected for eventGamepad on consumer.

// When the gamepad service is notified that new data has been received from a gamepad, the user agent MUST perform the following steps:

//  1. Let |now| be a {{DOMHighResTimeStamp}} value representing the current time.
//  1. Let |gamepad| be the item in connectedGamepads representing the gamepad that uploaded new data.
//  1. Let |buttonState| be the state of all buttons on the gamepad.

