const express = require("express");
const router = express.Router();
const passport = require("passport");
const path = require("path");

let sensorData = "No data yet"; // Mocked sensor data
setInterval(() => {
  sensorData = Math.floor(Math.random() * 100).toString();
}, 1000);

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login.html");
}

router.get("/", isAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
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

router.get("/data", isAuthenticated, (req, res) => {
  res.send(sensorData);
});

module.exports = router;
