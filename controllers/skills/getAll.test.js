const getAll = require("./getAll");

describe("GET /skills", () => {
  it("should return 200 and array of skills", async () => {
    const ctx = {
      request: {}
    };

    await getAll(ctx);

    expect(ctx.body.skills.length).toBeGreaterThan(10);
  });
});
