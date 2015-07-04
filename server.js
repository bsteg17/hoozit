var http = require('http'),
    fs = require('fs');

var html;
fs.readFile('./index.html', function (err, buffer) {
    if (err) {
        throw err; 
    }
    html = buffer;
    console.log(html);
    http.createServer(function(request, response) {  
        response.writeHeader(200, {"Content-Type": "text/html"});
        response.write(buffer);  
        response.end();
    }).listen(8080);
});

console.log(html);