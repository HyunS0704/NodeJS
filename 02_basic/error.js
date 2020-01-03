function callThreeTimes(calback){
    for(let i=0; i<3; i++){
        calback();
    }
}

//정상 실행
callThreeTimes(function() {console.log('안녕하세요');});

//예외 발생
//callThreeTimes();