const createCorsOptions = require("./corsOptions");

describe("create corsOptions", () => {
  it("should return a function", () => {
    const whitelist = ["http://allowed.com"];
    const corsOptions = createCorsOptions(whitelist);
    expect(typeof corsOptions).toBe("function");
  });

  it("should call callback with {origin: true} if the origin is in the whitelist", () => {
    const whitelist = ["http://allowed.com"];
    const req = {
      header: (name) => "http://allowed.com",
    };
    const callback = jest.fn();

    const corsOptions = createCorsOptions(whitelist);

    corsOptions(req, callback);

    expect(callback).toHaveBeenCalled();
  });

  it("should call callback with {origin: false} if the origin is not in the whitelist", () => {
    const whitelist = ["http://allowed.com"];
    const req = {
      header: (name) => "http://notallowed.com",
    };
    const callback = jest.fn();

    const corsOptions = createCorsOptions(whitelist);

    corsOptions(req, callback);

    expect(callback).toHaveBeenCalledWith(null, { origin: false });
  });
});
