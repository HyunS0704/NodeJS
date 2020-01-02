function makeTableRow(a, b, c){
    var row = `<tr><td>${a}</td><td>${b}</td><td>${b}</td></tr>`
    return row;
}

console.log(makeTableRow('aaa', `bbb`, `ccc`));