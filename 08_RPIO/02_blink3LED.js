var rpio = require('rpio');
const RED = 11;     //Red, pin11-GPIO17
const GREEN = 21;   //Green, Pin21-GPIO09
const YELLOW = 19;  //Yellow, pin19-GPIO10r

rpio.open(RED, rpio.OUTPUT, rpio.HIGH);
rpio.open(GREEN, rpio.OUTPUT, rpio.LOW);
rpio.open(YELLOW, rpio.OUTPUT, rpio.LOW);

//Toggle the state of the LED every 200ms
const iv = setInterval(function()
{
    rpio.write(RED, rpio.read(RED)^1);
    rpio.write(GREEN, rpio.read(GREEN)^1);
    rpio.write(YELLOW, rpio.read(YELLOW)^1);

}, 200);

//stop blinking the LED after 5 seconds
setTimeout(function()
{
    clearInterval(iv);
    rpio.close(RED);
    rpio.close(GREEN);
    rpio.close(YELLOW);

}, 5000);
