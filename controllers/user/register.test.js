const register = require("./register");

describe("POST /register", () => {
  it("should return 400 if trying to register existing user", async (done) => {
    const ctx = {
      request: {
        body: {
          user: {
            login: "test@test.test",
            password: "test",
            firstName: "TestoweImie",
            lastName: "Naziwtest",
            studentId: "111111",
            branches: ["Analiza Danych", "Technologie Internetowe"],
            skills: [
              {
                priority: 5,
                skillName: "C#"
              },
              {
                priority: 3,
                skillName: "NoSQL"
              },
              {
                priority: 1,
                skillName: "Latex"
              }
            ]
          }
        }
      }
    };

    try {
      await register(ctx);
      done.fail(new Error("Should Fail!"));
    } catch (error) {
      expect(error.statusCode).toEqual(400);
      done();
    }
  });

  it("should return 200 if trying to register not-existing user", async () => {
    const ctx = {
      request: {
        body: {
          user: {
            login: `test${(Math.random()*100000).toFixed(0)}@test.test`,
            password: "test",
            firstName: "TestoweImie",
            lastName: "Naziwtest",
            studentId: `${(Math.random()*150000).toFixed(0)}`,
            branches: ["Analiza Danych", "Technologie Internetowe"],
            skills: [
              {
                priority: 5,
                skillName: "C#"
              },
              {
                priority: 3,
                skillName: "NoSQL"
              },
              {
                priority: 1,
                skillName: "Latex"
              }
            ]
          }
        }
      }
    };

    await register(ctx);

    expect(ctx.body.token).toBeTruthy();
    expect(ctx.body.user.password).toBeTruthy();
  });
});
