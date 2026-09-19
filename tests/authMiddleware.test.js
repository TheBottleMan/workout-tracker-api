jest.mock("jsonwebtoken", () => ({
  verify: jest.fn(),
}));

const jwt = require("jsonwebtoken");

const authMiddleware = require("../src/middleware/authMiddleware");

describe("authMiddleware", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("debe permitir un token válido", () => {
    const req = {
      get: jest.fn().mockReturnValue("Bearer tokenValido"),
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const next = jest.fn();

    jwt.verify.mockReturnValue({
      id: 1,
      email: "usuario@gmail.com",
    });

    authMiddleware(req, res, next);

    expect(req.user.id).toBe(1);
    expect(next).toHaveBeenCalled();
  });

  test("debe rechazar una petición sin token", () => {
    const req = {
      get: jest.fn().mockReturnValue(undefined),
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const next = jest.fn();

    authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });

  test("debe rechazar un token inválido", () => {
    const req = {
      get: jest.fn().mockReturnValue("Bearer tokenInvalido"),
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const next = jest.fn();

    jwt.verify.mockImplementation(() => {
      throw new Error("Token inválido");
    });

    authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });
});
