const LoginController = require("./login");

describe("POST /login", () => {
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

  it("should return 400 if not existing user was trying to login", async done => {
    const ctx = {
      request: {
        body: {
          login: "testowy1@test.pl",
          password: "123"
        }
      }
    };

    try {
      await LoginController(ctx);
      done.fail(new Error("Should Fail!"));
    } catch (error) {
      expect(error.statusCode).toEqual(404);
      done();
    }
  });
});
