const request = require('supertest');
const express = require('express');
const app = require('./app');

app.get("/status", (request, response) => {
  const status = {
    "Amount": 10
  }
  response.send(status);
});

describe("GET /status", () => {
  it("should return a status object with an Amount field", async () => {
    const response = await request(app)
      .get('/status')
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.body).toEqual({ Amount: 10 });
  });


  it("should include 'Access-Control-Allow-Origin' test", async () => {
    const response = await request(app).get('/status');
    
    expect(response.headers['access-control-allow-origin']).toEqual('*');
    expect(response.status).toBe(200);
  });
});
