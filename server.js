const express = require("express");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const routes = require("./routes");
const cors = require("cors");

const users = []; // In-memory user store
const app = express();
const port = 8000;

// Add a hardcoded user for testing
users.push({
  id: "1",
  username: "admin",
  password: bcrypt.hashSync("admin", 12),
});

passport.use(
  new LocalStrategy((username, password, done) => {
    const user = users.find((user) => user.username === username);
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return done(null, false);
    }
    return done(null, user);
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  const user = users.find((user) => user.id === id);
  done(null, user);
});

app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: "http://localhost:3000", // or your specific origin
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/", routes); // Setup routes
app.use(express.static("water-plant-react/build")); // Serve static files last

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
