'use strict';

var rpio = require('rpio');
const RED = 11;
const GREEN = 21;   //Green, Pin21-GPIO09
const YELLOW = 19;  // Red, Pin11-GPIO17
const button = 3;

rpio.open(RED, rpio.OUTPUT, rpio.LOW);
rpio.open(GREEN, rpio.OUTPUT, rpio.LOW);
rpio.open(YELLOW, rpio.OUTPUT, rpio.LOW);
rpio.open(SWITCH, rpio.INPUT, rpio.PULL_OFF);

var value =0;
function pollcb(pin)
{
    rpio.sleep(3);      //3초후
    vlaue =vlaue ^ 1;
    rpio.write(GREEN, vlaue);   //녹색증 on

    rpio.sleep(10);
    for(let i=0;i<3;i++)
    {
        rpio.write(GREEN, rpio.LOW);
        rpio.msleep(500);
        rpio.write(GREEN, rpio.HIGH);
        rpio.msleep(500);
    }
    rpio.write(GREEN, rpio.LOW);
    rpio.write(YELLOW, rpio.HIGH);
    rpio.sleep(3);
    rpio.write(YELLOW, rpio.LOW);
    rpio.write(RED, rpio.HIGH);    
}

process.on('SIGINT', function()
{
    console.log('\nUser Interrupt Detected. Exiting');
    rpio.close(RED);
    rpio.close(GREEN);
    rpio.close(YELLOW);
    rpio.close(SWITCH);
});
rpio.poll(SWITCH, pollcb, rpio.POLL_LOW);
