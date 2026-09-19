const {
  isValidId,
  isValidEmail,
  isValidPassword,
} = require("../src/utils/validation");

describe("Validaciones", () => {
  test("debe aceptar un ID numérico", () => {
    expect(isValidId("10")).toBe(true);
  });

  test("debe rechazar un ID no numérico", () => {
    expect(isValidId("abc")).toBe(false);
  });

  test("debe aceptar un email válido", () => {
    expect(isValidEmail("usuario@gmail.com")).toBe(true);
  });

  test("debe rechazar un email inválido", () => {
    expect(isValidEmail("usuario")).toBe(false);
  });

  test("debe aceptar una contraseña de 6 caracteres", () => {
    expect(isValidPassword("123456")).toBe(true);
  });

  test("debe rechazar una contraseña corta", () => {
    expect(isValidPassword("123")).toBe(false);
  });
});
