var http = require('http');
var url = require('url');
var fs = require('fs');
var qs = require('querystring');
var sqlite3 = require('sqlite3').verbose();
var template = require('./view/template');

var listSql = "SELECT id, title, writer, strftime('%Y-%m-%d %H:%M', timestamp, 'localtime') ts, content, hit FROM bbs";
var searchSql = "SELECT id, title, writer, strftime('%Y-%m-%d %H:%M', timestamp, 'localtime') ts, content, hit FROM bbs where id=?";
var incHitSql = "update bbs set hit=(select hit from bbs where id=?)+1 where id=?";
var insertSql = "INSERT INTO bbs(title, writer, content) VALUES(?, ?, ?)";
var updateSql = "UPDATE bbs SET title=?, writer=?, timestamp=datetime('now'), content=? WHERE id=?";
var db = new sqlite3.Database("db/bbs.db");

var app = http.createServer(function(req, res) {
    var _url = req.url;
    var pathname = url.parse(_url, true).pathname;
    var queryData = url.parse(_url, true).query;

    if(pathname === '/')
    {
         // localhost:3000
        if(queryData.id === undefined)
        {
            let navBar = template.navMain();
            let trs = '';
            // DB 읽기
            db.all(listSql, function(err, rows) {
                for(let row of rows)
                {
                    trs += template.tableMain(row);
                }
                let html = template.Html(navBar, trs);
                res.writeHead(200);
                res.end(html);
            });
        }
        else
        { // localhost:3000/?id=101
            let idVal = parseInt(queryData.id);
            let navBar = template.navList(idVal);

            db.serialize(function() {
                // 조회수 증가하고
                var stmt = db.prepare(incHitSql);
                stmt.run(idVal, idVal);
                stmt.finalize();
                
                // 게시글 보여주기
                stmt = db.prepare(searchSql);
                stmt.get(idVal, function(err, row) {
                    let trs = template.tableItem(row);

                    let view = require('./view/itemView');
                    let html = view.itemView(navBar, trs);
                    res.writeHead(200);
                    res.end(html);
                });
                stmt.finalize();
            });
        }
    }
    else if(pathname === '/create')
    {
        let navBar = template.navOp();
        let view = require('./view/create');
        let html = view.create(navBar);
        res.writeHead(200);
        res.end(html);    
    }
    else if(pathname === '/create_proc')
    {
        var body ='';
        req.on('data', function(data){
            body += data;
        });
        req.on('end', function(){
            let post = qs.parse(body);
            let title = post.title;
            let writer = post.writer;
            let content = post.content;

            let stmt = db.prepare(insertSql);
            stmt.run(title, writer, content);
            stmt.finalize();

            res.writeHead(302, {Location: `/`});
            res.end();           
        });
    }
    else if(pathname === '/update')
    {
        let idVal = parseInt(queryData.id);
        let navBar = template.navOp();

        stmt = db.prepare(searchSql);
        stmt.get(idVal, function(err, row) {
            let view = require('./view/update');
            let html = view.update(navBar, row);
            res.writeHead(200);
            res.end(html);
        });
        stmt.finalize();
    }
    else if(pathname === '/update_proc')
    {
        var body ='';
        req.on('data', function(data){
            body += data;
        });
        req.on('end', function(){
            let post = qs.parse(body);
            let idval = parseInt(post.id);
            let title = post.title;
            let writer = post.writer;
            let content = post.content;

            let stmt = db.prepare(updateSql);
            stmt.run(title, writer, content, idval);
            stmt.finalize();     
            res.writeHead(302, {Location: `/?id=${idval}`});
            res.end();   
        });
    }
    else if(pathname === '/favicon.ico')
    {
        fs.readFile('nodejs.png', function(err, data){
            res.statusCode = 200;
            res.setHeader('Content-type', 'image/png');
            res.end(data);
        });
    }
    else
    {
        res.writeHead(404);
        res.end('Not found');
    }
});
app.listen(3000);