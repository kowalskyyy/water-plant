const express = require("express");
const router = express.Router();

module.exports = function (getSensorData) {
  router.get("/data", (req, res) => {
    res.set("Cache-Control", "no-store");
    res.send(getSensorData());
  });

  router.get("/sensor-data-1", (req, res) => {
    res.send("sensor 1: " + getSensorData());
  });

  router.get("/sensor-data-2", (req, res) => {
    res.send("sensor 2: " + getSensorData());
  });

  return router;
};
