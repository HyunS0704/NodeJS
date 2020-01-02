function Palindrome(min, max)
{
    let tmp;
    let finalMax = 0;
    // 범위안의 숫자 곱하기
    for(let i = min; i <= max; i++)
    {
        for(let k = i; k <= max; k++)
        {
            let prodCalc = i * k;
            tmp = String(prodCalc);         // 곱한 숫자 문자열로 바꾸기
            if(isSame(tmp))
            {
                // 최대값 찾기
                if(finalMax < prodCalc)
                {
                    finalMax = prodCalc;
                }
            }
        }
    }          
    console.log(finalMax);
}

// 앞뒤 같은지 비교
function isSame(numString)
{
    let finalIndex = numString.length - 1;
    for(let i = 0; i <= finalIndex; i++)
    {
        if(numString[i] == numString[finalIndex])
        {
            finalIndex--;
        }
        else
        {
            return false;
        }
    }
    return true;
}


Palindrome(100, 999);
// 913 X 993 곱한 결과 = 906609