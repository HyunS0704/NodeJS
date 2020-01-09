module.exports.delete = function(navBar, row) {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Express web</title>
            <meta charset = "utf-8">
        </head>
        <body>
            <h1>SQLite3로 만든 게시판</h1>
            <hr>
            <h4>${navBar}</h4>
            <hr>
            <h2>글 삭제하기</h2>
            <form action="/delete" method="post">
                <input type="hidden" name="id" value="${row.id}">
                <p>${row.title} 글을 삭제하겠습니까?</p>
                <p><input type="submit" value="확인"></p>
            </form>
        </body>
        </html>
    `;
}