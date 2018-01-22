const getAll = require("./getAll");

describe("LoginController", () => {
  it("should return 200 if correct credentials are provided", async () => {
    const ctx = {
      request: {}
    };

    await getAll(ctx);

    expect(ctx.body.skills.length).toBeGreaterThan(10);
  });
});
