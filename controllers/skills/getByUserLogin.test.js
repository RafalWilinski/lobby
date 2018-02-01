const getByUserLogin = require("./getByUserLogin");

describe("GET /user/skills", () => {
  it("should return 200", async () => {
    const ctx = {
      request: {
        query: {
          userLogin: 'testowy@test.pl'
        }
      }
    };

    await getByUserLogin(ctx);

    expect(ctx.body).toMatchSnapshot();
  });
});
