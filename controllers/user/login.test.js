const LoginController = require("./login");

describe("LoginController", () => {
  it("should return 200 if correct credentials are provided", async () => {
    const ctx = {
      request: {
        body: {
          login: "testowy@test.pl",
          password: "123"
        }
      }
    };

    await LoginController(ctx);

    expect(ctx.body.token).toBeTruthy();
  });

  it("should return 400 if incorrect credentials are provided", async done => {
    const ctx = {
      request: {
        body: {
          login: "testowy@test.pl",
          password: "1234"
        }
      }
    };

    try {
      await LoginController(ctx);
      done.fail(new Error("Should Fail!"));
    } catch (error) {
      expect(error.statusCode).toEqual(400);
      done();
    }
  });
});
