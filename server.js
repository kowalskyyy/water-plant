const express = require('express');
const setupSerialPort = require('./serialPortSetup');
const routes = require('./routes');

const app = express();
const port = 8000;

const getSensorData = setupSerialPort();

app.use(express.static('public'));
app.use('/', routes(getSensorData));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
