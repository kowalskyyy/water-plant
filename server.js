const express = require('express');
const app = express();
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
      sensorData = Math.floor(Math.random() * 100).toString();
    }, 1000);
  } else {
    const parser = arduinoPort.pipe(new ReadlineParser({ delimiter: '\r\n' }));
    parser.on('data', data => {
      sensorData = data;
    });
  }
});

app.get('/data', (req, res) => {
  res.send(sensorData);
});

app.get('/sensor-data-1', (req, res) => {
  res.send('sensor 1: ' + sensorData);
});

app.get('/sensor-data-2', (req, res) => {
  res.send('sensor 2: ' + sensorData);
});

app.use(express.static('public')); // Serve static files from 'public' folder

const port = 8000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
