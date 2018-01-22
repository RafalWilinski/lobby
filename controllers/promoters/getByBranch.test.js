const getByBranch = require("./getByBranch");

describe("GET /promoters", () => {
  it("should return 200 and array of promoters", async () => {
    const ctx = {
      request: {}
    };

    await getByBranch(ctx);

    expect(ctx.body.promoters.length).toBeGreaterThan(0);
  });
});
