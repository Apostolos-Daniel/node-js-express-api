// This line must come before importing any instrumented module.
const tracer = require('dd-trace').init();

const express = require('express');
const cors = require('cors');

const port = 3000;
const app = express ();
// Add a list of allowed origins.
// If you have more origins you would like to add, you can add them to the array below.
const allowedOrigins = ['http://localhost:3000'];

app.use(cors());
app.use(express.json());

app.get("/status", (request, response) => {
    const status = {
        "Amount": 10
    }

    response.send(status);
});

module.exports = app;