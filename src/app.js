// This line must come before importing any instrumented module.
const tracer = require("dd-trace").init();

const express = require("express");
const cors = require("cors");
const createCorsOptions = require("./corsOptions");

const app = express();
// Add a list of allowed origins.
// If you have more origins you would like to add, you can add them to the array below.
const whitelist = ["http://localhost:3001"];

const corsOptions = createCorsOptions(whitelist);

app.use(cors(corsOptions));
app.use(express.json());

app.get("/status", (request, response) => {
  const status = {
    Amount: 10,
  };
  response.send(status);
});
module.exports = app;
