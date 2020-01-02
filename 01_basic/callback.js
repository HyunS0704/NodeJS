function prinFiveTimes(callback)
{
    for(let i=0; i<5; i++)
    {
        callback();
    }
}

prinFiveTimes(function()
{
    console.log('callback function');
});

let anonymous = function()
{
    console.log('callback function')
} 
prinFiveTimes(anonymous);