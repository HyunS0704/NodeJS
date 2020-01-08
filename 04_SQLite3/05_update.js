var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database("../../03_Sqlite/test.db");

var sql = "UPDATE bbs SET timestamp=datetime('now')WHERE id =?"
var subsql= `update bbs set writer=(select writer from bbs where id= ?)where id=?`;



db.serialize(function()
{
    var stmt=db.prepare(sql);
    stmt.run(105);
    stmt.finalize();

    var sql_ts="select id, title, writer, strftime('%m-%d %H:%M', timestamp, 'localtime') ts, content FROM bbs";
    db.each(sql_ts, function(err,row)
    {
        console.log(row.id, row.title, row.writer, row.ts, row.content);
    });
});

db.close();