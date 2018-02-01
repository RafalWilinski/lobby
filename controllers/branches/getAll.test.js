const getAll = require("./getAll");

describe("GET /branches", () => {
  it("should return 200 and array of branches", async () => {
    const ctx = {
      request: {}
    };

    await getAll(ctx);

    expect(ctx.body.branches).toMatchSnapshot();
  });
});
