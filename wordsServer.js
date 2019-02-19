const http = require('http');
const fs = require('fs');
const qs = require('querystring');

function onRequest(request, response) {
    response.writeHead(200, {
        'Content-Type': 'text/json',
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
        "Access-Control-Allow-Origin": "*",
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE'
    });

    if (request.method === 'POST') {

        var body = '';
        request.on('data', function (data) {
            body += data;
            // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
            if (body.length > 1e6) {
                // FLOOD ATTACK OR FAULTY CLIENT, NUKE REQUEST
                request.connection.destroy();
            }
        });
        request.on('end', function () {

            var POST = qs.parse(body);
            // use POST
            console.log(POST);
        });
    }

    if (request.method === 'GET') {
        fs.readFile('./data.json', null, (error, data) => {
            if (error) {
                response.writeHead(404);
                response.write('File not found!');
            } else {
                response.write(data);
            }
        });
    }
    response.end()

}

http.createServer(onRequest).listen(8080);



