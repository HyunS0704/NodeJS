var http = require('http');
var url = require('url');
var fs = require('fs');
var qs = require('querystring');
var template = require('./view/template');


var contents = 
[
    {title:"HTML5", desc:"HTML is ..."},
    {title:"CSS3", desc:"CSS3 is ..."},
    {title:"Javascript", desc:"Javascript is ..."},
];

var app= http.createServer(function(req, res)
{
    //console.log(req.url);
    var _url = req.url;
    var pathname = url.parse(_url, true).pathname;
    var queryData =url.parse(_url, true).query;
    //console.log(pathname);
    //console.log(queryData);
    //console.log(pathname);
    
    if(pathname === '/')
    {
        if(queryData.title === undefined)      //localhost:3000
        {
            let navBar = template.navMain();
            let title = "Welcome to WEB World";
            let desc ='웹 기술은 1990년대 초반에 Tim-Berners Lee에 의해 개발되어 빠르게 전 세계로 확산되면서 인터넷 세상으로 모든 것을 바꾸어 놓았다';
            fs.readdir('./data', function(err, files)
            {
                let list = template.list(files);
                let html = template.Html(list, navBar, title, desc);
                res.writeHead(200);
                res.end(html);
            });
        }else       //localhost:3000/?tltle=xxx
        {
            let title = queryData.title;
            let navBar = template.navlist(title);
            fs.readdir('./data', function(err, files)
            {
                let list = template.list(files);
                fs.readFile(`./data/${title}.txt`, 'utf-8', function(err, desc)
                {
                let html = template.Html(list, navBar, title, desc);
                res.writeHead(200);
                res.end(html);
                });
            });
            for(let content of contents)
            {
                if(content.title === title)
                {
                    desc = content.desc;
                }
            }
        }
    }else if(pathname === '/create')
    {
        fs.readdir('./data', function(err, files)
        {
            let list = template.list(files);
            let navBar = template.navOp();
            let view = require('./view/create');
            let html = view.create(list, navBar);
            res.writeHead(200);
            res.end(html);
        });
    }
    else if(pathname === '/create_proc')
    {
        var body ='';
        req.on('data', function(data)
        {
            body += data;
        });
        req.on('end', function()
        {
            let post = qs.parse(body);
            let title = post.title;
            let desc = post.desc;
            fs.writeFile(`./data/${title}.txt`, desc, 'utf-8', function(err)
            {
                res.writeHead(302, {Location: `./?title=${title}`});
                res.end();
            });
        });
    }
    else if(pathname === '/update')
    {
        let title = queryData.title;
        fs.readdir('./data', function(err, files)
        {
            let list = template.list(files);
            let navBar = template.navOp();
            fs.readFile(`./data/${title}.txt`, 'utf-8', function(err, desc)
            { 
                let view = require('./view/update');
                let html = view.update(list, navBar, title, desc);
                res.writeHead(200);
                res.end(html);
            });
        });
    }
    else if(pathname === '/update_proc')
    {
        var body ='';
        req.on('data', function(data)
        {
            body += data;
        });
        req.on('end', function()
        {
            let post = qs.parse(body);
            let oldTitle = post.oldTitle;
            let title = post.title;
            let desc = post.desc;
            fs.rename(`./data/${oldTitle}.txt`, `./data/${title}.txt`, function()
            {
                fs.writeFile(`./data/${title}.txt`, desc, 'utf-8', function(err)
                {
                    res.writeHead(302, {Location: `./?title=${title}`});
                    res.end();
                });
            });
        });
    }
    else if(pathname === '/delete')
    {
        let title = queryData.title;
        fs.readdir('./data', function(err, files)
            {
                let list = template.list(files);
                let navBar = template.navOp();
                let view = require('./view/delete');
                let html = view.delete(list, navBar, title);
                res.writeHead(200);
                res.end(html);
            });
    }
    else if(pathname === '/delete_proc')
    {
        var body ='';
        req.on('data', function(data)
        {
            body += data;
        });
        req.on('end', function()
        {
            let post = qs.parse(body);
            let title = post.title;
            fs.unlink(`./data/${title}.txt`, function()
            {
                res.writeHead(302, {Location: '/'});
                res.end();
            });
        });
    }
    else if(pathname === '/favicon.ico')
    {
        fs.readFile('nodejs.png', function(err, data)
        {
            res.statusCode =200;
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