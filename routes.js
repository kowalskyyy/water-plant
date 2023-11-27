const express = require("express");
const router = express.Router();
const passport = require("passport");
const path = require("path");
const arduinoData = require("./serialPortSetup");

let sensorData = "No data yet";
setInterval(() => {
  function randVal() {
    return Math.floor(Math.random() * 100).toString();
  }
  sensorData = [arduinoData(), randVal(), randVal()];
}, 1000);

// Check if user is authenticated
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).send("User not authenticated");
}

// API to check if user is authenticated
router.get("/api/check-auth", (req, res) => {
  res.json({ isAuthenticated: req.isAuthenticated() });
});

// Handle login
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Authentication failed" });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.json({ success: true, message: "Authentication successful" });
    });
  })(req, res, next);
});

// Handle logout
router.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

// Protected route for sensor data
router.get("/data", isAuthenticated, (req, res) => {
  console.log("data sent: " + sensorData);
  res.send(sensorData);
});

module.exports = router;
