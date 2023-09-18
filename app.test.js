const request = require("supertest");
const app = require("./app");
const createCorsOptions = require("./corsOptions");

describe("GET /status", () => {
  it("should return a status object with an Amount field", async () => {
    const response = await request(app)
      .get("/status")
      .expect("Content-Type", /json/)
      .expect(200);
    expect(response.body).toEqual({ Amount: 10 });
  });

  it("should include 'Access-Control-Allow-Origin' header with allowed origin", async () => {
    const allowedOrigin = "http://localhost:3001";
    const response = await request(app)
      .get("/status")
      .set("Origin", allowedOrigin); // Setting the Origin header

    expect(response.headers["access-control-allow-origin"]).toEqual(
      allowedOrigin,
    );
    expect(response.status).toBe(200);
  });

  it("should include 'Access-Control-Allow-Origin' test", async () => {
    const response = await request(app)
      .get("/status")
      .set("Origin", "http://notallowed.com"); // Setting the Origin header

    expect(response.headers["access-control-allow-origin"]).toEqual(undefined);
    expect(response.status).toBe(200);
  });
});
