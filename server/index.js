///////////////////////////////
// Imports
///////////////////////////////

require("dotenv").config();
const path = require("path");
const express = require("express");

// middleware imports
const handleCookieSessions = require("./middleware/handleCookieSessions");
const checkAuthentication = require("./middleware/checkAuthentication");
const logRoutes = require("./middleware/logRoutes");
const logErrors = require("./middleware/logErrors");

// controller imports
const authControllers = require("./controllers/authControllers");
const userControllers = require("./controllers/userControllers");
const app = express();
const challenges = require("./controllers/challControllers");

// middleware
app.use(handleCookieSessions); // adds a session property to each request representing the cookie
app.use(logRoutes); // print information about each incoming request
app.use(express.json()); // parse incoming request bodies as JSON
// app.use(express.static(path.join(__dirname, '../frontend/dist'))); // Serve static assets from the dist folder of the frontend

///////////////////////////////
// Auth Routes
//////////////////////////////

app.post("/api/auth/register", authControllers.registerUser);
app.post("/api/auth/login", authControllers.loginUser);
app.get("/api/auth/me", authControllers.showMe);
app.delete("/api/auth/logout", authControllers.logoutUser);

///////////////////////////////
// User Routes
///////////////////////////////

// These actions require users to be logged in (authentication)
// Express lets us pass a piece of middleware to run for a specific endpoint
// app.get('/api/users', checkAuthentication, userControllers.listUsers);
app.get("/api/users/:id", checkAuthentication, userControllers.getUserById);
app.patch("/api/users/:id", checkAuthentication, userControllers.updateUser);

///////////////////////////////
// Fallback Routes
///////////////////////////////

// Requests meant for the API will be sent along to the router.
// For all other requests, send back the index.html file in the dist folder.
app.get("*", (req, res, next) => {
  if (req.originalUrl.startsWith("/api")) return next();
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});
// // Middleware function for logging route requests
// const logRoutes = (req, res, next) => {
//   const time = new Date().toLocaleString();
//   console.log(`${req.method}: ${req.originalUrl} - ${time}`);
//   next(); // Passes the request to the next middleware/controller
// };

// Register the logRoutes middleware globally to log all requests
app.use(logRoutes);

// Other endpoints and controllers
app.get("/", (req, res) => {
  res.send("Welcome to the Mindful Matter API!");
});

app.get("/api/challenges/all", challenges.getAllChallenges);
app.get("/api/challenges/:id", challenges.getChallengeById);

app.use(logErrors);

///////////////////////////////
// Start Listening
///////////////////////////////

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
