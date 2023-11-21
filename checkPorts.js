const {SerialPort} = require('serialport');

SerialPort.list().then(ports => {
  ports.forEach(port => {
    console.log(port.path);
  });
}).catch(err => {
  console.error('Error listing ports', err);
});
