const { SerialPort } = require("serialport");
const { ReadlineParser } = require("@serialport/parser-readline");

module.exports = function () {
  let sensorData = "No data yet";

  const arduinoPort = new SerialPort(
    {
      path: "COM3", // Replace with your port
      baudRate: 9600,
    },
    (err) => {
      if (err) {
        console.log("Failed to connect to Arduino, using mock data instead.");
        setInterval(() => {
          sensorData = Math.floor(Math.random() * 100).toString();
        }, 1000);
      } else {
        const parser = arduinoPort.pipe(
          new ReadlineParser({ delimiter: "\r\n" })
        );
        parser.on("data", (data) => {
          sensorData = data;
        });
      }
    }
  );

  return () => sensorData;
};
