const express = require("express");
const router = express.Router();
const passport = require("passport");
const path = require("path");
const arduinoData = require("./serialPortSetup");

let sensorData = "No data yet"; // Mocked sensor data
setInterval(() => {
  function randVal() {
    return Math.floor(Math.random() * 100).toString();
  }
  sensorData = [arduinoData(), randVal(), randVal()];
}, 1000);

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login.html");
}

router.get("/", isAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, "water-plant-react/build", "index.html"));
});

router.get("/login.html", (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect("/");
  } else {
    res.sendFile(path.join(__dirname, "public", "login.html"));
  }
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login.html",
  })
);

router.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/login.html");
  });
});

router.get("/refresh", (req, res) => {});

router.get("/data", (req, res) => {
  console.log("data senet" + sensorData);
  res.send(sensorData);
});

module.exports = router;
