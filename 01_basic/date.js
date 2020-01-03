let now = new Date();
/* console.log(now.getFullYear());       // 2020 
console.log(now.getMonth());        //0     월은 0부터 시작.
console.log(now.getDate());          //2
console.log(now.getDay());           //4        0은 일요일, 6은 토요일
console.log(now.getHours());        //13
console.log(now.getMinutes());  */    //22 */


let currentHour = now.getHours();       //12시 오전 오후분류        //now.getHours(); => 현재시각 기준으로
if(currentHour >= 12)
{
    console.log(`오후` + (currentHour -12) + '시');
}
else
{
    console.log(`오전` + currentHour + '시');
}

if(currentHour >= 12)
{
    console.log(`오후 ${currentHour-12}시`);
}
else
{
    console.log(`오전 ${currentHour}시`);
}

let apm  = '오전';
if(currentHour >=13)
{
    apm = '오후';
    currentHour -= 12;
}

apm = currentHour >= 12 ? '오후' : '오전';
currentHour = currentHour >= 13 ? currentHour-12 : currentHour;

console.log(`${apm} ${currentHour}시`);