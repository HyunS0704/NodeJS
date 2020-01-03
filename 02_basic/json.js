const javascriptObject = [
    { name: '윤인성', region: '서울'},
    { name: '윤명월', region: '도쿄'}
];

let outputA = JSON.stringify(javascriptObject);
let outputB = JSON.stringify(javascriptObject, null, 2);
console.log(typeof(outputA));
console.log(outputA);
console.log(typeof(outputB));
console.log(outputB);
console.log('-----------------------------------------------------------------------------');

let outputC = JSON.parse(outputB);
console.log(typeof(outputC));
console.log(outputC);