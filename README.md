# Clínica Médica — NestJS + Prisma

API REST para la gestión de una clínica médica, desarrollada con **NestJS**, **TypeScript**, **Prisma** y **PostgreSQL**.

El proyecto implementa autenticación mediante JWT, autorización por roles, validación de datos, manejo de errores, documentación con Swagger, logging de peticiones y configuración mediante variables de entorno.

## Tecnologías

* NestJS
* TypeScript
* Prisma ORM
* PostgreSQL
* JWT
* Passport
* Joi
* Swagger / OpenAPI
* RxJS
* pnpm

## Requisitos

* Node.js
* pnpm
* PostgreSQL

## Instalación

Clonar el repositorio e instalar las dependencias:

```bash
pnpm install
```

Crear un archivo `.env` en la raíz del proyecto utilizando `.env.example` como referencia.

Ejemplo:

```env
DATABASE_URL="postgresql://usuario:password@localhost:5433/clinicaSalud"
JWT_SECRET="una-clave-segura-de-al-menos-10-caracteres"
PORT=3000
```

Ejecutar las migraciones de Prisma:

```bash
pnpm prisma migrate dev
```

## Ejecución

### Desarrollo

```bash
pnpm start:dev
```

### Compilación

```bash
pnpm build
```

### Producción

```bash
pnpm start:prod
```

La aplicación utiliza el puerto configurado mediante `PORT`. Si no se especifica, utiliza el puerto `3000`.

## Documentación de la API

La documentación interactiva está disponible mediante Swagger:

```text
http://localhost:3000/api/docs
```

Desde Swagger se pueden probar los endpoints de autenticación, pacientes, médicos y citas.

## Arquitectura

El proyecto está organizado en módulos siguiendo la arquitectura de NestJS:

```text
src/
├── auth/
├── citas/
├── common/
├── medicos/
├── pacientes/
├── prisma/
├── app.module.ts
└── main.ts
```

### Principales componentes

* **Auth:** registro, login y autenticación mediante JWT.
* **Pacientes:** gestión de pacientes.
* **Médicos:** gestión de médicos.
* **Citas:** gestión de citas relacionadas con pacientes.
* **Prisma:** conexión y acceso a PostgreSQL.
* **Common:** componentes reutilizables, como el interceptor de logging.

## Pipeline de una petición en NestJS

Uno de los principales aprendizajes del proyecto es entender cómo NestJS procesa una petición HTTP.

Para el endpoint:

```text
POST /citas
```

el flujo general es:

```text
Request
   │
   ▼
JwtAuthGuard
   │
   ▼
RolesGuard
   │
   ▼
LoggingInterceptor
   │
   ▼
ValidationPipe
   │
   ▼
CitasController
   │
   ▼
CitasService
   │
   ├──► PacientesService
   │
   └──► PrismaService
   │
   ▼
Respuesta
   │
   ▼
LoggingInterceptor
```

### 1. JwtAuthGuard

Comprueba que la petición tenga un token JWT válido.

Si no existe el token o es inválido, la petición termina con una respuesta `401 Unauthorized`.

### 2. RolesGuard

Comprueba que el usuario autenticado tenga el rol necesario para ejecutar el endpoint.

Esto permite implementar autorización basada en roles.

### 3. LoggingInterceptor

El interceptor global registra el inicio y el tiempo empleado en procesar la petición.

Al finalizar registra información como:

```text
POST /citas — 25ms
```

El interceptor utiliza RxJS para observar la respuesta sin modificarla.

### 4. ValidationPipe

Valida el cuerpo de la petición utilizando los DTO definidos para cada recurso.

Si los datos no cumplen las reglas de validación, NestJS devuelve una respuesta `400 Bad Request`.

### 5. Controller y Service

El `CitasController` recibe la petición y delega la lógica de negocio al `CitasService`.

El servicio realiza las operaciones necesarias y, para crear una cita, verifica la existencia del paciente mediante `PacientesService`.

Después utiliza `PrismaService` para acceder a la base de datos.

### 6. PrismaExceptionFilter

Si Prisma genera una excepción conocida, el filtro global la intercepta y la transforma en una respuesta HTTP apropiada.

Esto permite evitar que los errores internos de Prisma lleguen directamente al cliente.

### 7. LoggingInterceptor al finalizar

Antes de enviar la respuesta al cliente, el `LoggingInterceptor` registra el tiempo total que tomó procesar la petición.

De esta manera podemos observar el rendimiento de los endpoints sin modificar su respuesta.

## Flujo de creación de una cita

Ejemplo de una petición:

```http
POST /citas
Authorization: Bearer <token>
Content-Type: application/json
```

El sistema:

1. Verifica el JWT.
2. Verifica el rol del usuario.
3. Registra el inicio de la petición.
4. Valida el DTO.
5. El controller recibe la petición.
6. El service verifica que el paciente exista.
7. Prisma crea la cita.
8. Si ocurre un error de Prisma, el filtro lo transforma.
9. El interceptor registra el tiempo total.
10. Se devuelve la respuesta HTTP.

## Manejo de configuración

Las variables de entorno son administradas mediante `@nestjs/config`.

Las variables requeridas son:

* `DATABASE_URL`
* `JWT_SECRET`
* `PORT`

`Joi` valida la configuración al iniciar la aplicación.

`JWT_SECRET` requiere una longitud mínima de 10 caracteres y `PORT` utiliza `3000` como valor predeterminado.

## Variables de entorno

El repositorio incluye un archivo:

```text
.env.example
```

Este archivo contiene únicamente los nombres de las variables necesarias y **no contiene valores reales ni secretos**.

Los valores reales deben mantenerse en `.env`.

## Verificación de la aplicación

Para comprobar el funcionamiento completo mediante Swagger:

1. Ejecutar la aplicación:

```bash
pnpm start:dev
```

2. Abrir:

```text
http://localhost:3000/api/docs
```

3. Realizar login para obtener un JWT.
4. Utilizar el botón **Authorize** de Swagger.
5. Intentar crear una cita para un paciente inexistente.

Resultado esperado:

```text
404 Not Found
```

6. Crear una cita utilizando un paciente existente.

Resultado esperado:

```text
201 Created
```

7. Revisar la terminal para comprobar el registro del `LoggingInterceptor`.

Ejemplo:

```text
POST /citas — 20ms
```

## Scripts principales

```bash
# Instalar dependencias
pnpm install

# Desarrollo
pnpm start:dev

# Compilar
pnpm build

# Producción
pnpm start:prod

# Ejecutar pruebas
pnpm test

# Prisma
pnpm prisma migrate dev
```

## Objetivo del proyecto

Este proyecto permitió integrar diferentes características fundamentales de NestJS:

* Módulos
* Controllers
* Services
* DTOs
* Prisma
* Guards
* Interceptors
* Pipes
* Exception Filters
* JWT
* Roles
* Swagger
* Configuración mediante variables de entorno
* Logging
* Validación

El objetivo final es comprender cómo estas piezas trabajan juntas dentro del ciclo de vida de una petición HTTP.
