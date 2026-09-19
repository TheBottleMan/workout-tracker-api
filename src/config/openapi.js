const swaggerSpec = {
  openapi: "3.0.0",

  info: {
    title: "Workout Tracker API",
    version: "1.0.0",
    description:
      "API RESTful para gestionar usuarios, ejercicios, entrenamientos y progreso.",
  },

  servers: [
    {
      url: "http://localhost:3000",
    },
  ],

  tags: [
    {
      name: "Auth",
      description: "Autenticación de usuarios",
    },
    {
      name: "Users",
      description: "Gestión de usuarios",
    },
    {
      name: "Exercises",
      description: "Gestión de ejercicios",
    },
    {
      name: "Workouts",
      description: "Gestión de entrenamientos",
    },
    {
      name: "Progress",
      description: "Gestión del progreso",
    },
  ],

  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },

  paths: {
    "/api/auth/register": {
      post: {
        tags: ["Auth"],
        summary: "Registrar usuario",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              example: {
                name: "Juan Pérez",
                email: "juan@gmail.com",
                password: "123456",
              },
            },
          },
        },
        responses: {
          201: {
            description: "Usuario creado",
          },
          400: {
            description: "Datos inválidos",
          },
        },
      },
    },

    "/api/auth/login": {
      post: {
        tags: ["Auth"],
        summary: "Iniciar sesión",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              example: {
                email: "juan@gmail.com",
                password: "123456",
              },
            },
          },
        },
        responses: {
          200: {
            description: "Login exitoso",
          },
          401: {
            description: "Credenciales inválidas",
          },
        },
      },
    },

    "/api/users": {
      get: {
        tags: ["Users"],
        summary: "Listar usuarios",
        responses: {
          200: {
            description: "Lista de usuarios",
          },
        },
      },

      post: {
        tags: ["Users"],
        summary: "Crear usuario",
        responses: {
          201: {
            description: "Usuario creado",
          },
          400: {
            description: "Datos inválidos",
          },
        },
      },
    },

    "/api/users/{id}": {
      get: {
        tags: ["Users"],
        summary: "Obtener usuario",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "integer",
            },
          },
        ],
        responses: {
          200: {
            description: "Usuario encontrado",
          },
          404: {
            description: "Usuario no encontrado",
          },
        },
      },

      put: {
        tags: ["Users"],
        summary: "Actualizar usuario",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "integer",
            },
          },
        ],
        responses: {
          200: {
            description: "Usuario actualizado",
          },
          403: {
            description: "Sin permisos",
          },
          404: {
            description: "Usuario no encontrado",
          },
        },
      },

      patch: {
        tags: ["Users"],
        summary: "Actualizar parcialmente usuario",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "integer",
            },
          },
        ],
        responses: {
          200: {
            description: "Usuario actualizado",
          },
        },
      },

      delete: {
        tags: ["Users"],
        summary: "Eliminar usuario",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "integer",
            },
          },
        ],
        responses: {
          204: {
            description: "Usuario eliminado",
          },
          404: {
            description: "Usuario no encontrado",
          },
        },
      },
    },

    "/api/exercises": {
      get: {
        tags: ["Exercises"],
        summary: "Listar ejercicios",
        responses: {
          200: {
            description: "Lista de ejercicios",
          },
        },
      },

      post: {
        tags: ["Exercises"],
        summary: "Crear ejercicio",
        responses: {
          201: {
            description: "Ejercicio creado",
          },
        },
      },
    },

    "/api/exercises/{id}": {
      get: {
        tags: ["Exercises"],
        summary: "Obtener ejercicio",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "integer",
            },
          },
        ],
        responses: {
          200: {
            description: "Ejercicio encontrado",
          },
          404: {
            description: "Ejercicio no encontrado",
          },
        },
      },
    },

    "/api/workouts": {
      get: {
        tags: ["Workouts"],
        summary: "Listar entrenamientos",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "limit",
            in: "query",
            schema: {
              type: "integer",
            },
          },
          {
            name: "status",
            in: "query",
            schema: {
              type: "string",
              enum: ["pending", "completed"],
            },
          },
        ],
        responses: {
          200: {
            description: "Lista de entrenamientos",
          },
        },
      },

      post: {
        tags: ["Workouts"],
        summary: "Crear entrenamiento",
        security: [{ bearerAuth: [] }],
        responses: {
          201: {
            description: "Entrenamiento creado",
          },
          400: {
            description: "Datos inválidos",
          },
        },
      },
    },

    "/api/workouts/{id}": {
      get: {
        tags: ["Workouts"],
        summary: "Obtener entrenamiento",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "integer",
            },
          },
        ],
        responses: {
          200: {
            description: "Entrenamiento encontrado",
          },
          404: {
            description: "Entrenamiento no encontrado",
          },
        },
      },

      put: {
        tags: ["Workouts"],
        summary: "Actualizar entrenamiento",
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: "Entrenamiento actualizado",
          },
        },
      },

      patch: {
        tags: ["Workouts"],
        summary: "Actualizar parcialmente entrenamiento",
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: "Entrenamiento actualizado",
          },
        },
      },

      delete: {
        tags: ["Workouts"],
        summary: "Eliminar entrenamiento",
        security: [{ bearerAuth: [] }],
        responses: {
          204: {
            description: "Entrenamiento eliminado",
          },
          404: {
            description: "Entrenamiento no encontrado",
          },
        },
      },
    },

    "/api/progress": {
      get: {
        tags: ["Progress"],
        summary: "Listar progreso",
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: "Lista de progreso",
          },
        },
      },

      post: {
        tags: ["Progress"],
        summary: "Crear registro de progreso",
        security: [{ bearerAuth: [] }],
        responses: {
          201: {
            description: "Registro creado",
          },
        },
      },
    },

    "/api/progress/{id}": {
      get: {
        tags: ["Progress"],
        summary: "Obtener progreso",
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: "Registro encontrado",
          },
          404: {
            description: "Registro no encontrado",
          },
        },
      },

      put: {
        tags: ["Progress"],
        summary: "Actualizar progreso",
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: "Registro actualizado",
          },
        },
      },

      patch: {
        tags: ["Progress"],
        summary: "Actualizar parcialmente progreso",
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: "Registro actualizado",
          },
        },
      },

      delete: {
        tags: ["Progress"],
        summary: "Eliminar progreso",
        security: [{ bearerAuth: [] }],
        responses: {
          204: {
            description: "Registro eliminado",
          },
        },
      },
    },

    "/api/progress/report": {
      get: {
        tags: ["Progress"],
        summary: "Generar informe",
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: "Informe de entrenamientos pasados y progreso",
          },
        },
      },
    },
  },
};

module.exports = swaggerSpec;
