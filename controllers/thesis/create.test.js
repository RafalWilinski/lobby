const { omit } = require('lodash');
const create = require("./create");

describe("POST /thesis", () => {
  it("should return 200 if correct thesis is provided", async () => {
    const ctx = {
      request: {
        body: {
          thesis: {
            name: "Testowy Temat",
            description: "Opis Opis Opis Opis Opis Opis Opis Opis Opis Opis ",
            ispublic: false,
            branches: [
              "Przetwarzanie Rozproszone",
              "Analiza Danych",
              "Programowanie Równoległe",
              "Badania Operacyjne"
            ],
            promoterId: 1
          },
          roles: [
            {
              name: "Ja jako kapitan",
              description:
                "Stanowisko Stanowisko Stanowisko Stanowisko Stanowisko Stanowisko Stanowisko ",
              skills: ["C", "C++", "C#", "Python"],
              capitan: true,
              userLogin: "1@1.com"
            },
            {
              name: "Druga pozycja do testowego",
              description: "Wymagane skille: Arduino, SQL, NoSQL",
              skills: ["Arduino", "SQL", "NoSQL"],
              capitan: false
            }
          ]
        }
      }
    };

    await create(ctx);

    expect(ctx.body.thesis.description).toMatchSnapshot();
  });
});
