function perfectNumber(min, max)
{
    var sum;
    for(let i = 2; i <= max; i++)
    {
        sum = 0;
        for(let k = 1; k < i; k++)
        {
            if(i % k == 0)
            {
                sum += k;
            }
        }
        if(i == sum)
        {
            console.log(i);
        }
    }
}


perfectNumber(1, 10000);