'use strict';

const Gpio = require('onoff').Gpio; // Gpio class
const led = new Gpio(17, 'out');    // Export GPIO17 as an output

// Toggle the state of the LED connected to GPIO17 every 200ms
const iv = setInterval(function() {
	led.writeSync(led.readSync() ^ 1);      //readSync 상태에서 반전(^)으로 led 출력
}, 200);

// Stop blinking the LED after 5 seconds
setTimeout(function() {
	clearInterval(iv); // Stop blinking
	led.unexport();    // Unexport GPIO and free resources
}, 5000);

// 0.2초동안 led 깜박, 5초후에 led off