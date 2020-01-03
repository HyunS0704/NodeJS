var old;
function makeTableRow(a, b, c){
    var row = `<tr><td>${a}</td><td>${b}</td><td>${b}</td></tr>`
    old = '<tr><td>' + a + '</td><td>' + b + '</td><td>' + c + '</td></tr>'
    return row;
}

console.log(makeTableRow('aaa', `bbb`, `ccc`));
if(old ===makeTableRow('aaa', `bbb`, `ccc`)){
    console.log('같습니다.')
}