function calTenTimes(calback){
    if(calback){
        for(let i=0; i<10; i++){
            calback();
        }
    }else {
        console.log('매게 변수 calback이 지정되지 않습니다.');
    }
}

callThreeTimes(function() {console.log('안녕하세요');});