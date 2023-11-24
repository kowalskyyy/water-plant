const { SerialPort } = require("serialport");
const { ReadlineParser } = require("@serialport/parser-readline");

let sensorData = "No data yet";
module.exports = function () {
  const arduinoPort = new SerialPort(
    {
      path: "COM3", // Replace with your port
      baudRate: 9600,
    },
    (err) => {
      if (err) {
        console.log("Failed to connect to Arduino, using mock data instead.");

        sensorData = Math.floor(Math.random() * 100).toString();
        console.log("mockedData" + sensorData);

        return sensorData;
      } else {
        const parser = arduinoPort.pipe(
          new ReadlineParser({ delimiter: "\r\n" })
        );
        parser.on("data", (data) => {
          sensorData = data;
        });
        return sensorData;
      }
    }
  );

  return sensorData;
};
