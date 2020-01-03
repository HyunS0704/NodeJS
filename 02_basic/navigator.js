var http = require('http');

function Navmsg(msg, url) {
    return `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8">
            <title>Navigator</title>
            <script>
              // ios와 안드로이드의 웹 브라우저를 구분합니다.
                if(navigator.userAgent.toLowerCase().indexOf('ipone') >= 0
                    || navigator.userAgent.toLowerCase().indexOf('ipad') >= 0
                    || navigator.userAgent.toLowerCase().indexOf('ipod') >= 0
                    || navigator.userAgent.toLowerCase().indexOf('android') >= 0){
                        alert('모바일 웹 브라우저입니다.');
                    }else{
                        alert('데스크톱 웹 브라우저입니다.');
                    }
                </script>
        </head>
        <body>
            <h3>Navigator 판별</h3>
        </body>
    </html>
    `;
} 

var app = http.createServer(function(request, response)
{
    //console.log(request.url);       //localhost:3000이후 오는 주소가 찍힘
    response.writeHead(200);
    let msg = Navmsg();
    response.end(msg);
});
app.listen(3000);