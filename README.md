# Workout Tracker API

API RESTful desarrollada con **Node.js, Express y MySQL** para gestionar usuarios, ejercicios, planes de entrenamiento y registros de progreso.

El proyecto implementa autenticación mediante **JWT**, operaciones CRUD, validación de datos, filtros mediante Query Strings, manejo de estados HTTP, pruebas automatizadas y documentación mediante OpenAPI/Swagger.

---

## 1. Descripción del proyecto

Workout Tracker es una API backend para una aplicación de seguimiento de entrenamientos.

El sistema permite:

* Registrar usuarios.
* Iniciar sesión mediante JWT.
* Gestionar usuarios.
* Gestionar ejercicios.
* Crear planes de entrenamiento.
* Asociar múltiples ejercicios a un entrenamiento.
* Definir series, repeticiones y peso.
* Agregar comentarios a los entrenamientos.
* Programar entrenamientos para una fecha y hora.
* Consultar entrenamientos pendientes o completados.
* Registrar progreso.
* Generar informes sobre entrenamientos pasados y progreso.

---

## 2. Tecnologías utilizadas

* **Node.js**
* **Express**
* **MySQL**
* **mysql2**
* **dotenv**
* **bcryptjs**
* **jsonwebtoken**
* **Jest**
* **Supertest**
* **Swagger UI**
* **OpenAPI**

---

## 3. Requisitos previos

Antes de ejecutar el proyecto se necesita tener instalado:

* Node.js
* npm
* MySQL
* Git

También se puede utilizar **XAMPP** para ejecutar el servidor MySQL localmente.

---

## 4. Instalación

Clonar el repositorio:

```bash
git clone URL_DEL_REPOSITORIO
```

Entrar al proyecto:

```bash
cd workout-tracker-api
```

Instalar las dependencias:

```bash
npm install
```

---

## 5. Variables de entorno

Crear un archivo `.env` en la raíz del proyecto.

Ejemplo:

```env
PORT=3000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=workout_tracker

JWT_SECRET=workout_tracker_secret
```

### Descripción de las variables

| Variable      | Descripción                                |
| ------------- | ------------------------------------------ |
| `PORT`        | Puerto donde se ejecutará la API           |
| `DB_HOST`     | Dirección del servidor MySQL               |
| `DB_USER`     | Usuario de MySQL                           |
| `DB_PASSWORD` | Contraseña del usuario de MySQL            |
| `DB_NAME`     | Nombre de la base de datos                 |
| `JWT_SECRET`  | Clave utilizada para firmar los tokens JWT |

El archivo `.env` no debe subirse al repositorio.

---

## 6. Base de datos

Crear la base de datos:

```sql
CREATE DATABASE workout_tracker;
```

Después seleccionar la base de datos:

```sql
USE workout_tracker;
```

### Tabla `users`

```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Tabla `exercises`

```sql
CREATE TABLE exercises (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(50) NOT NULL,
    muscle_group VARCHAR(50) NOT NULL
);
```

### Tabla `workouts`

```sql
CREATE TABLE workouts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    comments TEXT,
    scheduled_at DATETIME,
    status ENUM('pending', 'completed') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);
```

### Tabla `workout_exercises`

```sql
CREATE TABLE workout_exercises (
    id INT AUTO_INCREMENT PRIMARY KEY,
    workout_id INT NOT NULL,
    exercise_id INT NOT NULL,
    repetitions INT NOT NULL,
    sets INT NOT NULL,
    weight DECIMAL(8,2) DEFAULT 0,

    FOREIGN KEY (workout_id)
        REFERENCES workouts(id)
        ON DELETE CASCADE,

    FOREIGN KEY (exercise_id)
        REFERENCES exercises(id)
        ON DELETE CASCADE
);
```

### Tabla `progress`

```sql
CREATE TABLE progress (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    workout_id INT,
    notes TEXT,
    progress_value DECIMAL(8,2),
    recorded_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    FOREIGN KEY (workout_id)
        REFERENCES workouts(id)
        ON DELETE SET NULL
);
```

---

## 7. Seeder de ejercicios

El proyecto incluye un sembrador de ejercicios ubicado en:

```text
seeds/exercises.sql
```

Ejemplo:

```sql
INSERT INTO exercises
(name, description, category, muscle_group)
VALUES
(
    'Press de banca',
    'Ejercicio de fuerza para pecho.',
    'fuerza',
    'pecho'
),
(
    'Press militar',
    'Ejercicio de fuerza para hombros.',
    'fuerza',
    'hombros'
),
(
    'Sentadilla',
    'Ejercicio compuesto para piernas.',
    'fuerza',
    'piernas'
),
(
    'Peso muerto',
    'Ejercicio compuesto para cadena posterior.',
    'fuerza',
    'espalda'
),
(
    'Dominadas',
    'Ejercicio para espalda y brazos.',
    'fuerza',
    'espalda'
),
(
    'Correr',
    'Ejercicio cardiovascular.',
    'cardio',
    'piernas'
),
(
    'Estiramiento de piernas',
    'Ejercicio de flexibilidad.',
    'flexibilidad',
    'piernas'
);
```

Para utilizarlo, ejecutar el contenido de `seeds/exercises.sql` sobre la base de datos `workout_tracker`.

---

## 8. Estructura del proyecto

```text
workout-tracker-api/
│
├── src/
│   ├── config/
│   │   ├── db.js
│   │   └── openapi.js
│   │
│   ├── controllers/
│   │   ├── userController.js
│   │   ├── exerciseController.js
│   │   ├── workoutController.js
│   │   └── progressController.js
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── models/
│   │   ├── userModel.js
│   │   ├── exerciseModel.js
│   │   ├── workoutModel.js
│   │   └── progressModel.js
│   │
│   ├── routes/
│   │   ├── userRoutes.js
│   │   ├── authRoutes.js
│   │   ├── exerciseRoutes.js
│   │   ├── workoutRoutes.js
│   │   └── progressRoutes.js
│   │
│   ├── utils/
│   │   └── validation.js
│   │
│   └── app.js
│
├── seeds/
│   └── exercises.sql
│
├── tests/
│   ├── app.test.js
│   ├── authMiddleware.test.js
│   └── validation.test.js
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
└── server.js
```

---

## 9. Ejecución del proyecto

### Modo normal

```bash
npm start
```

### Modo desarrollo

```bash
npm run dev
```

El servidor se ejecutará en:

```text
http://localhost:3000
```

---

## 10. Pruebas

Ejecutar las pruebas con:

```bash
npm test
```

Las pruebas verifican, entre otros aspectos:

* Validaciones.
* Middleware de autenticación.
* Respuestas básicas de la API.
* Estados HTTP.
* Cabeceras de respuesta.

---

# 11. Autenticación

La API utiliza **JSON Web Tokens (JWT)** para proteger los endpoints que requieren autenticación.

El flujo de autenticación es:

```text
Registro
   ↓
Login
   ↓
JWT
   ↓
Authorization Header
   ↓
authMiddleware
   ↓
Endpoint protegido
```

Los endpoints protegidos deben recibir la cabecera:

```text
Authorization: Bearer <TOKEN>
```

El middleware obtiene la cabecera utilizando `req.get("Authorization")` y verifica el token.

Los usuarios solamente pueden acceder a sus propios entrenamientos y registros de progreso.

---

# 12. Endpoints

## 12.1 Autenticación

| Método | Endpoint             | Descripción       | Auth | Estado          |
| ------ | -------------------- | ----------------- | ---- | --------------- |
| POST   | `/api/auth/register` | Registrar usuario | No   | 201 / 400       |
| POST   | `/api/auth/login`    | Iniciar sesión    | No   | 200 / 400 / 401 |

---

## 12.2 Usuarios

| Método | Endpoint         | Descripción            | Auth | Estado                |
| ------ | ---------------- | ---------------------- | ---- | --------------------- |
| GET    | `/api/users`     | Listar usuarios        | No   | 200                   |
| GET    | `/api/users/:id` | Obtener usuario        | No   | 200 / 400 / 404       |
| POST   | `/api/users`     | Crear usuario          | No   | 201 / 400             |
| PUT    | `/api/users/:id` | Actualización completa | JWT  | 200 / 400 / 403 / 404 |
| PATCH  | `/api/users/:id` | Actualización parcial  | JWT  | 200 / 400 / 403 / 404 |
| DELETE | `/api/users/:id` | Eliminar usuario       | JWT  | 204 / 400 / 403 / 404 |

---

## 12.3 Ejercicios

| Método | Endpoint             | Descripción           | Auth | Estado          |
| ------ | -------------------- | --------------------- | ---- | --------------- |
| GET    | `/api/exercises`     | Listar ejercicios     | No   | 200             |
| GET    | `/api/exercises/:id` | Obtener ejercicio     | No   | 200 / 404       |
| POST   | `/api/exercises`     | Crear ejercicio       | No   | 201 / 400       |
| PUT    | `/api/exercises/:id` | Actualizar ejercicio  | No   | 200 / 400 / 404 |
| PATCH  | `/api/exercises/:id` | Actualización parcial | No   | 200 / 400 / 404 |
| DELETE | `/api/exercises/:id` | Eliminar ejercicio    | No   | 204 / 404       |

---

## 12.4 Entrenamientos

| Método | Endpoint            | Descripción            | Auth | Estado          |
| ------ | ------------------- | ---------------------- | ---- | --------------- |
| GET    | `/api/workouts`     | Listar entrenamientos  | JWT  | 200 / 400       |
| GET    | `/api/workouts/:id` | Obtener entrenamiento  | JWT  | 200 / 400 / 404 |
| POST   | `/api/workouts`     | Crear entrenamiento    | JWT  | 201 / 400       |
| PUT    | `/api/workouts/:id` | Actualización completa | JWT  | 200 / 400 / 404 |
| PATCH  | `/api/workouts/:id` | Actualización parcial  | JWT  | 200 / 400 / 404 |
| DELETE | `/api/workouts/:id` | Eliminar entrenamiento | JWT  | 204 / 400 / 404 |

---

## 12.5 Progreso

| Método | Endpoint               | Descripción                  | Auth | Estado          |
| ------ | ---------------------- | ---------------------------- | ---- | --------------- |
| GET    | `/api/progress`        | Listar registros de progreso | JWT  | 200 / 400       |
| GET    | `/api/progress/:id`    | Obtener registro             | JWT  | 200 / 400 / 404 |
| POST   | `/api/progress`        | Crear registro               | JWT  | 201 / 400       |
| PUT    | `/api/progress/:id`    | Actualización completa       | JWT  | 200 / 400 / 404 |
| PATCH  | `/api/progress/:id`    | Actualización parcial        | JWT  | 200 / 400 / 404 |
| DELETE | `/api/progress/:id`    | Eliminar registro            | JWT  | 204 / 400 / 404 |
| GET    | `/api/progress/report` | Generar informe              | JWT  | 200             |

---

# 13. Ejemplos de uso

## 13.1 Registrar usuario

### Request

```http
POST /api/auth/register
Content-Type: application/json
```

```json
{
    "name": "Juan Pérez",
    "email": "juan@gmail.com",
    "password": "123456"
}
```

### Response

```json
{
    "message": "Usuario creado correctamente",
    "user": {
        "id": 1,
        "name": "Juan Pérez",
        "email": "juan@gmail.com"
    }
}
```

Estado:

```text
201 Created
```

---

# 14. Iniciar sesión

### Request

```http
POST /api/auth/login
Content-Type: application/json
```

```json
{
    "email": "juan@gmail.com",
    "password": "123456"
}
```

### Response

```json
{
    "message": "Inicio de sesión exitoso",
    "token": "JWT_TOKEN"
}
```

Estado:

```text
200 OK
```

---

# 15. Crear ejercicio

### Request

```http
POST /api/exercises
Content-Type: application/json
```

```json
{
    "name": "Press militar",
    "description": "Ejercicio para hombros",
    "category": "fuerza",
    "muscle_group": "hombros"
}
```

### Response

```json
{
    "message": "Ejercicio creado correctamente"
}
```

Estado:

```text
201 Created
```

---

# 16. Consultar ejercicios

### Listar todos

```http
GET /api/exercises
```

### Obtener por ID

```http
GET /api/exercises/1
```

---

# 17. Query Strings

La API utiliza Query Strings para aplicar límites y filtros.

### Usuarios

```http
GET /api/users?limit=10
```

```http
GET /api/users?search=juan
```

### Entrenamientos

```http
GET /api/workouts?limit=10
```

```http
GET /api/workouts?status=pending
```

```http
GET /api/workouts?status=pending&limit=5
```

### Progreso

```http
GET /api/progress?limit=10
```

```http
GET /api/progress?from=2026-09-01&to=2026-09-30
```

---

# 18. Crear entrenamiento

Los entrenamientos pueden estar compuestos por múltiples ejercicios.

### Request

```http
POST /api/workouts
Authorization: Bearer <TOKEN>
Content-Type: application/json
```

```json
{
    "name": "Rutina de pecho",
    "description": "Entrenamiento de fuerza",
    "comments": "Primera sesión",
    "scheduled_at": "2026-09-20 17:00:00",
    "exercises": [
        {
            "exercise_id": 1,
            "repetitions": 10,
            "sets": 4,
            "weight": 50
        },
        {
            "exercise_id": 3,
            "repetitions": 8,
            "sets": 3,
            "weight": 20
        }
    ]
}
```

### Response

```json
{
    "message": "Entrenamiento creado correctamente",
    "id": 1
}
```

Estado:

```text
201 Created
```

---

# 19. Consultar entrenamiento

### Request

```http
GET /api/workouts/1
Authorization: Bearer <TOKEN>
```

### Response

```json
{
    "id": 1,
    "name": "Rutina de pecho",
    "description": "Entrenamiento de fuerza",
    "comments": "Primera sesión",
    "scheduled_at": "2026-09-20 17:00:00",
    "status": "pending",
    "exercises": [
        {
            "exercise_id": 1,
            "name": "Press de banca",
            "description": "Ejercicio de fuerza para pecho.",
            "category": "fuerza",
            "muscle_group": "pecho",
            "repetitions": 10,
            "sets": 4,
            "weight": 50
        }
    ]
}
```

---

# 20. Actualizar entrenamiento

## PUT

```http
PUT /api/workouts/1
Authorization: Bearer <TOKEN>
Content-Type: application/json
```

```json
{
    "name": "Rutina de pecho actualizada",
    "description": "Entrenamiento de fuerza actualizado",
    "comments": "Nueva sesión",
    "scheduled_at": "2026-09-21 17:00:00"
}
```

## PATCH

```http
PATCH /api/workouts/1
Authorization: Bearer <TOKEN>
Content-Type: application/json
```

```json
{
    "comments": "Se aumentó el peso"
}
```

---

# 21. Eliminar entrenamiento

### Request

```http
DELETE /api/workouts/1
Authorization: Bearer <TOKEN>
```

### Response

No contiene cuerpo de respuesta.

Estado:

```text
204 No Content
```

---

# 22. Registrar progreso

### Request

```http
POST /api/progress
Authorization: Bearer <TOKEN>
Content-Type: application/json
```

```json
{
    "workout_id": 1,
    "progress_value": 55.5,
    "notes": "Aumenté el peso en el ejercicio principal"
}
```

### Response

```json
{
    "message": "Registro de progreso creado correctamente",
    "id": 1
}
```

Estado:

```text
201 Created
```

---

# 23. Consultar progreso

### Request

```http
GET /api/progress
Authorization: Bearer <TOKEN>
```

### Response

```json
[
    {
        "id": 1,
        "workout_id": 1,
        "workout_name": "Rutina de pecho",
        "progress_value": 55.5,
        "notes": "Aumenté el peso",
        "recorded_at": "2026-09-20T18:00:00.000Z"
    }
]
```

---

# 24. Informe de progreso

### Request

```http
GET /api/progress/report
Authorization: Bearer <TOKEN>
```

### Response

```json
{
    "summary": {
        "total_workouts": 8,
        "completed_workouts": 5,
        "progress_records": 12,
        "highest_progress": 80
    },
    "past_workouts": [
        {
            "id": 1,
            "name": "Rutina de pecho",
            "scheduled_at": "2026-09-15 17:00:00",
            "status": "completed",
            "progress_value": 70,
            "notes": "Mejor rendimiento"
        }
    ]
}
```

Este endpoint permite consultar información de entrenamientos anteriores y registros de progreso.

---

# 25. Códigos de estado HTTP

La API utiliza los siguientes estados:

| Estado                      | Significado                                   |
| --------------------------- | --------------------------------------------- |
| `200 OK`                    | Operación realizada correctamente             |
| `201 Created`               | Recurso creado correctamente                  |
| `204 No Content`            | Recurso eliminado correctamente               |
| `400 Bad Request`           | Datos o parámetros inválidos                  |
| `401 Unauthorized`          | Falta autenticación o el token es inválido    |
| `403 Forbidden`             | El usuario no tiene permiso para la operación |
| `404 Not Found`             | Recurso no encontrado                         |
| `500 Internal Server Error` | Error interno del servidor                    |

---

# 26. Cabeceras HTTP

La API utiliza la cabecera:

```text
Content-Type: application/json
```

Para endpoints protegidos se utiliza:

```text
Authorization: Bearer <TOKEN>
```

Además, la API configura la cabecera personalizada:

```text
X-API-Key: WorkoutTracker
```

---

# 27. Documentación OpenAPI

La API incluye documentación mediante OpenAPI y Swagger UI.

Una vez iniciado el servidor, acceder a:

```text
http://localhost:3000/api-docs
```

Desde allí se pueden consultar los endpoints documentados y sus operaciones.

---

# 28. Arquitectura del proyecto

El proyecto separa las responsabilidades en diferentes capas:

```text
Routes
   ↓
Controllers
   ↓
Models
   ↓
MySQL
```

### Routes

Definen las rutas HTTP disponibles.

### Controllers

Procesan las solicitudes y construyen las respuestas.

### Models

Contienen las operaciones de acceso a la base de datos.

### Middleware

Gestiona aspectos como la autenticación JWT.

### Utils

Contiene funciones auxiliares y validaciones.

### Config

Contiene la configuración de la base de datos y OpenAPI.

---

# 29. Seguridad

Las contraseñas de los usuarios se almacenan utilizando hash mediante `bcryptjs`.

Los endpoints protegidos requieren un JWT válido.

Además, las consultas de entrenamientos y progreso filtran los registros utilizando el identificador del usuario autenticado.

De esta manera, un usuario no puede gestionar los entrenamientos o registros pertenecientes a otro usuario.

---

# 30. Estrategia de ramas Git

El repositorio utiliza las siguientes ramas:

```text
main
develop
feat/users
feat/workouts
feat/exercises
feat/progress
```

### `main`

Rama principal y protegida.

### `develop`

Rama utilizada para integrar las funcionalidades desarrolladas.

### `feat/users`

Desarrollo relacionado con usuarios y autenticación.

### `feat/workouts`

Desarrollo relacionado con planes de entrenamiento.

### `feat/exercises`

Desarrollo relacionado con ejercicios.

### `feat/progress`

Desarrollo relacionado con registros de progreso.

---

# 31. Secuencia de commits por recurso

Cada rama de recurso sigue la estructura indicada para el proyecto:

```text
Commit 1
Scaffold del router y endpoints básicos

Commit 2
Implementación de GET

Commit 3
Creación mediante POST

Commit 4
Actualización mediante PUT y PATCH

Commit 5
Eliminación mediante DELETE

Commit 6
Validaciones, Query Strings y estados HTTP

Commit 7
Actualización del README
```

---

# 32. Flujo de integración

Las funcionalidades se desarrollan en sus respectivas ramas:

```text
feat/users
feat/workouts
feat/exercises
feat/progress
```

Después se integran en:

```text
develop
```

Finalmente, una vez verificadas las funcionalidades, `develop` se integra en:

```text
main
```

---

# 33. Comandos principales de Git

Ver el estado:

```bash
git status
```

Ver ramas:

```bash
git branch
```

Ver historial:

```bash
git log --oneline --graph --all
```

Crear una rama:

```bash
git checkout -b nombre-rama
```

Cambiar de rama:

```bash
git checkout nombre-rama
```

Agregar cambios:

```bash
git add .
```

Crear commit:

```bash
git commit -m "mensaje del commit"
```

Subir una rama:

```bash
git push -u origin nombre-rama
```

Actualizar una rama:

```bash
git pull origin nombre-rama
```

---

# 34. Scripts disponibles

### Iniciar la API

```bash
npm start
```

### Desarrollo con Nodemon

```bash
npm run dev
```

### Ejecutar pruebas

```bash
npm test
```

---

# 35. Estado del proyecto

El proyecto contiene:

* API RESTful desarrollada con Express.
* Base de datos relacional MySQL.
* CRUD de usuarios, ejercicios, entrenamientos y progreso.
* Registro e inicio de sesión.
* Autenticación JWT.
* Validaciones de parámetros y datos.
* Query Strings para filtros.
* Manejo de estados HTTP.
* Cabeceras HTTP.
* Seeder de ejercicios.
* Gestión de entrenamientos con múltiples ejercicios.
* Registro de progreso.
* Informes de entrenamientos pasados y progreso.
* Pruebas automatizadas.
* Documentación OpenAPI/Swagger.
* Versionamiento mediante ramas y commits en Git.
