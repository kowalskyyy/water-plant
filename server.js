const http = require('http');
const fs = require('fs');
const path = require('path');
const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');

let sensorData = "No data yet";

const arduinoPort = new SerialPort({
  path: 'COM3', // Replace with your port
  baudRate: 9600,
}, (err) => {
  if (err) {
    console.log('Failed to connect to Arduino, using mock data instead.');
    setInterval(() => {
      sensorData = Math.floor(Math.random() * 100).toString(); // Mock data
    }, 1000);
  } else {
    const parser = arduinoPort.pipe(new ReadlineParser({ delimiter: '\r\n' }));
    parser.on('data', data => {
      sensorData = data;
    });
  }
});

const host = 'localhost';
const serverPort = 8000;

const requestListener = function (req, res) {
    if (req.url.startsWith('/data')) {
        res.writeHead(200);
        res.end(sensorData);
        return;
    }

    let filePath = '.' + req.url;
    if (filePath === './') {
        filePath = './index.html';
    }

    const extname = String(path.extname(filePath)).toLowerCase();
    const mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
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
};

const server = http.createServer(requestListener);
server.listen(serverPort, host, () => {
    console.log(`Server is running on http://${host}:${serverPort}`);
});
