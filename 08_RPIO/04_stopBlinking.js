var rpio = require('rpio');
const RED = 11;     // Red, Pin11-GPIO17
const SWITCH = 3;   // Switch, Pin3-GPIO2

rpio.open(RED, rpio.OUTPUT, rpio.LOW);
rpio.open(SWITCH, rpio.INPUT, rpio.PULL_OFF);

var vlaue = 0;
function pollcb(pin)
{
    rpio.msleep(3000);
    vlaue =vlaue ^ 1;
    rpio.write(RED, vlaue);
 
    console.log('Button pressed on pin P%d', pin);
}

process.on('SIGINT', function() {
    console.log('\nUser Interrupt Detected. Exiting');
    rpio.close(RED);
    rpio.close(SWITCH);
});

rpio.poll(SWITCH, pollcb, rpio.POLL_LOW);
