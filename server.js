const http = require('http');
const fs = require('fs');
const path = require('path');
const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');

// Arduino setup
const arduinoPort = new SerialPort({
  path: 'COM3', // Replace with your port
  baudRate: 9600,
});
const parser = arduinoPort.pipe(new ReadlineParser({ delimiter: '\r\n' }));
let sensorData = "No data yet";
parser.on('data', data => {
  sensorData = data;
});

const host = 'localhost';
const serverPort = 8000;

const requestListener = function (req, res) {
    if (req.url === '/data') {
        res.writeHead(200);
        res.end(sensorData);
    } else {
        let filePath = '.' + req.url;
        if (filePath === './') {
            filePath = './index.html';
        }

        const extname = String(path.extname(filePath)).toLowerCase();
        const mimeTypes = {
            '.html': 'text/html',
            '.js': 'text/javascript',
            // add other mime types as needed
        };

        const contentType = mimeTypes[extname] || 'application/octet-stream';

        fs.readFile(filePath, function(error, content) {
            if (error) {
                if(error.code === 'ENOENT') {
                    res.writeHead(404);
                    res.end("Not Found");
                } else {
                    res.writeHead(500);
                    res.end('Server Error: '+error.code);
                }
            } else {
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(content, 'utf-8');
            }
        });
    }
};

const server = http.createServer(requestListener);
server.listen(serverPort, host, () => {
    console.log(`Server is running on http://${host}:${serverPort}`);
});
