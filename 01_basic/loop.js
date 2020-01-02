
/*for( let i=0; i<5; i++)
{
    for(let k=0; k<=i; k++)
    {
        process.stdout.write('*');
    }
    console.log();
}*/

//결과
//*
//**
//***
//****
//*****

//역삼각 1
/*for(let i=5; i>0; i--)
{
    for(let k=5; k>0; k--)
    {
        k <= i ? process.stdout.write('*') : process.stdout.write(' ');
    }
    console.log();
}*/
//역삼각 2
/*for(let i=0; i<4; i++)
{
    for(let k=0; k<i; k++)
    {
        process.stdout.write(' ');
    }
    for(let j=0; j<7-2*i; j++)
    {
        process.stdout.write('*');
    }
    console.log();
}*/


//다이아 별 그리기
for(let i=0; i<5; i++)
{
    for(let k=0; k<4-i; k++)
    {
        process.stdout.write(' ');
    }
    for(let j=0; j<i*2+1;  j++)
    {
        process.stdout.write('*');
    }
    console.log();
}
for(let i=0; i<5; i++)
{
    for(let k=0; k<i+1; k++)
    {
        process.stdout.write(' ');
    }
    for(let j=0; j<7-2*i; j++)
    {
        process.stdout.write('*');
    }
    console.log();
}