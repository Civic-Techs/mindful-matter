const express = require("express");
const app = express();
const challenges = require("./controllers/challControllers");

// Middleware function for logging route requests
const logRoutes = (req, res, next) => {
  const time = new Date().toLocaleString();
  console.log(`${req.method}: ${req.originalUrl} - ${time}`);
  next(); // Passes the request to the next middleware/controller
};

// Register the logRoutes middleware globally to log all requests
app.use(logRoutes);

// Other endpoints and controllers
app.get("/", (req, res) => {
  res.send("Welcome to the Mindful Matter API!");
});

app.get("/challenges", challenges.getAllChallenges);
app.get("/challenges/:id", challenges.getChallengeById);

const port = 8080;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
