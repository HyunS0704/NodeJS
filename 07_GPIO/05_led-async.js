let stopBlinking = false;
const Gpio = require('onoff').Gpio; // Gpio class
const led = new Gpio(17, 'out');    // Export GPIO17 as an output

const blinkLed = function()
{
    if (stopBlinking)
        return led.unexport();
    led.read(function(err, value)
    {
        if(err)
            throw err;
        if(value ==0)
            console.log('LED ON');
        else
            console.log('LED OFF');
        led.write(value^1, function(err){
            if(err)
                throw err;
        });
    });
    setTimeout(blinkLed, 1000);
};

blinkLed();

//stop blinking the LED after 10 seconds
setTimeout(function(){
    stopBlinking =true
}, 10000);