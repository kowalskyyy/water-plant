const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');



const port = new SerialPort({
    path: 'COM3',
    baudRate: 9600,
  })

  const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }));
  parser.on('data', data => {
    console.log('Data:', data);
  });
  