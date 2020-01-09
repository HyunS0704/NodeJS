var express = require('express');
var sqlite3 = require('sqlite3').verbose();
var bodyParser = require('body-parser');
var template = require('./view/template');

var listSql = "SELECT id, title, userId, strftime('%Y-%m-%d %H:%M', timestamp, 'localtime') ts, content, hit FROM bbs";
var searchSql = "SELECT id, title, userId, strftime('%Y-%m-%d %H:%M', timestamp, 'localtime') ts, content, hit FROM bbs where id=?";
var incHitsql= `update bbs set hit=(select hit from bbs where id=?)+1 where id=?`;
var insertSql = `INSERT INTO bbs(title, userId, content) VALUES(?, ?, ?)`;
var updateSql=`UPDATE bbs SET title=?, userId=?, timestamp=datetime('now'), content=? WHERE id=?`;
var deleteSql= `DELETE FROM bbs WHERE id=?`;
var db = new sqlite3.Database("db/bbs.db");

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('public'));
app.get('/', function(req, res)
{
    let navBar = template.navMain();
    let trs = '';
    //DB 읽기
    db.all(listSql, function(err, rows)
    {
        for(let row of rows)
        {
            trs += template.tableMain(row); 
        }
        let view = require('./view/index');
        let html = view.index(navBar, trs);
        res.writeHead(200);
        res.end(html);
    });
});
app.get('/id/:id', function(req, res)
{
    let idval = parseInt(req.params.id);
    let navBar = template.navlist(idval);
    db.serialize(function()
    {
    //조회수 증가하고
        var stmt=db.prepare(incHitsql);
        stmt.run(idval, idval);
        stmt.finalize();
    
    //게시글 보여주기
        stmt= db.prepare(searchSql);
        stmt.get(idval, function(err,row)
        {
            let trs = template.tableItem(row);
            let view =require('./view/itemview');
            let html= view.itemview(navBar, trs);
            res.writeHead(200);
            res.end(html);
        });
            stmt.finalize();
    });
});

app.get('/create', function(req, res)
{
    let navBar = template.navOp();
    let view = require('./view/create');
    let html = view.create(navBar);
    res.send(html);
});
app.post('/create', function(req, res)
{
    let title = req.body.title;
    let userId = req.body.userId;
    let content = req.body.content;
     
    let stmt=db.prepare(insertSql);
    stmt.run(title, userId, content);
    stmt.finalize();

    res.redirect('/');
});
app.get('/update/:id', function(req, res)
{
    let idval = parseInt(req.params.id);
    let navBar = template.navOp();
    
    let stmt= db.prepare(searchSql);
    stmt.get(idval, function(err,row)
    {
        
        let view =require('./view/update');
        let html= view.update(navBar, row);
        res.send(html);
    });
    stmt.finalize();
});
app.post('/update', function(req, res)
{
    let idval = parseInt(req.body.id);
    let title = req.body.title;
    let userId = req.body.userId;
    let content = req.body.content;

    let stmt =db.prepare(updateSql);
    stmt.run(title, userId, content, idval);
    stmt.finalize();
    res.redirect(`/id/${idval}`);
});
app.get('/delete/:id', function(req,res)
{
    let idval = parseInt(req.params.id);
    let navBar = template.navOp();
    
    let stmt= db.prepare(searchSql);
    stmt.get(idval, function(err,row)
    {
        
        let view =require('./view/delete');
        let html= view.delete(navBar, row);
        res.send(html);
    });
    stmt.finalize();
});
app.post('/delete', function(req, res)
{
    let idval = parseInt(req.body.id);

    let stmt =db.prepare(deleteSql);
    stmt.run(idval);
    stmt.finalize();
    res.redirect('/');
});
app.get('*', function(req, res)     //
{
    res.status(404).send('File not found');
});
app.listen(3000);
