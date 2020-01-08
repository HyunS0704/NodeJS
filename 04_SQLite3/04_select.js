var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database("../../03_Sqlite/test.db");

var sql_ts = `SELECT id, title, writer, strftime('%m-%d %H:%M', timestamp, 'localtime') ts, content FROM bbs`;
var sql = `SELECT id, title, writer, strftime('%m-%d %H:%M', timestamp, 'localtime') ts, content FROM bbs where id=?`;


db.serialize(function()
{   
    //일괄 추출
    console.log('일괄 추출');
    db.all(sql_ts, function(err, rows)      //rows실행결과가 rows로 들어감
    {
        for(let row of rows)
        {
            console.log(row.id, row.title, row.writer, row.ts, row.content);
        }
    });

    //라인단위 추출
    console.log('라인단위 추출');
    db.each(sql_ts, function(err, row)
    {
        console.log(row.id, row.title, row.writer, row.ts, row.content);
    });

    //단일 추출
    console.log('단일 추출');
    var sql = "select strftime('%m-%d %H:%M', 'now', 'localtime') ts";
    db.get(sql, function(err, row)
    {
        console.log(row.ts);
    });

    //검색
    console.log('검색');
    var stmt =db.prepare(sql);
    stmt.get(103, function(err, row)
    {
        console.log(row);
    });
    stmt.finalize();
});
