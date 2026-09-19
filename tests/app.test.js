const request = require("supertest");

const app = require("../src/app");

describe("API", () => {
  test("GET / debe devolver 200", async () => {
    const response = await request(app).get("/");

    expect(response.statusCode).toBe(200);

    expect(response.body.message).toBe("Workout Tracker API funcionando");
  });

  test("debe devolver la cabecera X-API-Key", async () => {
    const response = await request(app).get("/");

    expect(response.headers["x-api-key"]).toBe("WorkoutTracker");
  });

  test("ruta inexistente debe devolver 404", async () => {
    const response = await request(app).get("/ruta-inexistente");

    expect(response.statusCode).toBe(404);
  });
});
