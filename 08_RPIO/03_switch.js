var rpio = require('rpio');
const RED = 11;     // Red, Pin11-GPIO17
const SWITCH = 3;   // Switch, Pin3-GPIO2

rpio.open(RED, rpio.OUTPUT, rpio.LOW);
rpio.open(SWITCH, rpio.INPUT, rpio.PULL_OFF);

function pollcb(pin)
{
    rpio.msleep(20);
    rpio.write(RED, rpio.read(RED) ^ 1);
 
    console.log('Button pressed on pin P%d', pin);
}

process.on('SIGINT', function() {
    console.log('\nUser Interrupt Detected. Exiting');
    rpio.close(RED);
    rpio.close(SWITCH);
});

rpio.poll(SWITCH, pollcb, rpio.POLL_LOW);

