const { SerialPort } = require("serialport");
const { ReadlineParser } = require("@serialport/parser-readline");

let sensorData = "No data yet";
let sensorData1 = "No data yet";
let sensorData2 = "No data yet";
let data = {};
module.exports = function () {
  const arduinoPort = new SerialPort(
    {
      path: "COM3", // Replace with your port
      baudRate: 9600,
    },
    (err) => {
      if (err) {
        //console.log("Failed to connect to Arduino, using mock data instead.");

        mock = Math.floor(Math.random() * 100).toString();
        mock1 = Math.floor(Math.random() * 100).toString();
        mock2 = Math.floor(Math.random() * 100).toString();
        sensorData = {
          sensor1: mock,
          sensor2: mock1,
          sensor3: mock2,
        };
        console.log(
          "mockedData" +
            sensorData.sensor1 +
            sensorData.sensor2 +
            sensorData.sensor3
        );

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
