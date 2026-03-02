# 🎯 Gestor de Opiniones - Opinion System API

Una API REST robusta y segura para la gestión de opiniones, usuarios y comentarios. Sistema completo con autenticación JWT, validación de datos y buenas prácticas de seguridad.

## 📋 Tabla de Contenidos

- [Características](#características)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Configuración del Entorno](#configuración-del-entorno)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Modelos de Datos](#modelos-de-datos)
- [Endpoints de API](#endpoints-de-api)
- [Autenticación](#autenticación)
- [Ejemplos de Uso](#ejemplos-de-uso)
- [Seguridad](#seguridad)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)

## ✨ Características

- ✅ **Autenticación Segura**: JWT con contraseñas encriptadas con Argon2
- ✅ **Gestión de Usuarios**: CRUD completo con soft delete
- ✅ **Sistema de Opiniones**: Crear, leer, actualizar opiniones categorizadas
- ✅ **Sistema de Comentarios**: Comentarios anidados en opiniones
- ✅ **Validación de Datos**: Validación completa de entrada con express-validator
- ✅ **Seguridad**: Helmet, CORS configurado, Rate limiting
- ✅ **Base de Datos**: MongoDB con Mongoose
- ✅ **Logging**: Morgan para monitoreo de solicitudes
- ✅ **Paginación**: Soporte para listados paginados

## 📦 Requisitos Previos

- Node.js v16+ 
- MongoDB v4.4+
- npm o yarn
- Variables de entorno configuradas

## 🚀 Instalación

### 1. Clonar el Repositorio

```bash
git clone https://github.com/milian-rm/gestor_de_opiniones.git
cd gestor_de_opiniones
```

### 2. Instalar Dependencias

```bash
npm install
```

### 3. Configurar Variables de Entorno

Crear un archivo `.env` en la raíz del proyecto:

```env
# Puerto del servidor
PORT=3001

# MongoDB Connection String
URL_MONGODB=mongodb+srv://usuario:contraseña@cluster.mongodb.net/gestor_opiniones?retryWrites=true&w=majority

# JWT Secret Key (Generar una clave segura)
SECRET_KEY=tu_clave_secreta_super_segura_aqui

# Cloudinary (Opcional, para imágenes)
CLOUDINARY_CLOUD_NAME=tu_cloud_name
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret
```

### 4. Iniciar el Servidor

```bash
# Desarrollo (con nodemon)
npm run dev

# Producción
npm start
```

El servidor estará disponible en: `http://localhost:3001/opinionSystem/v1`

## 📁 Estructura del Proyecto

```
gestor_de_opiniones/
├── configs/
│   ├── app.js                      # Configuración de Express
│   ├── db.js                       # Conexión a MongoDB
│   ├── cors-configuration.js       # Configuración CORS
│   └── helmet-configuration.js     # Configuración de Seguridad
├── middlewares/
│   ├── user-validator.js           # Validadores de Usuario
│   ├── opinion-validator.js        # Validadores de Opinión
│   ├── comment-validator.js        # Validadores de Comentario
│   ├── request-limit.js            # Rate Limiting
│   └── handle-errors.js            # Manejo de Errores
├── src/
│   ├── auth/
│   │   ├── auth.controller.js      # Lógica de Autenticación
│   │   └── auth.routes.js          # Rutas de Auth
│   ├── user/
│   │   ├── user.model.js           # Modelo de Usuario
│   │   ├── user.controller.js      # Controlador de Usuario
│   │   └── user.routes.js          # Rutas de Usuario
│   ├── opinion/
│   │   ├── opinion.model.js        # Modelo de Opinión
│   │   ├── opinion.controller.js   # Controlador de Opinión
│   │   └── opinion.routes.js       # Rutas de Opinión
│   └── comment/
│       ├── comment.model.js        # Modelo de Comentario
│       ├── comment.controller.js   # Controlador de Comentario
│       └── comment.routes.js       # Rutas de Comentario
├── index.js                        # Punto de entrada
├── package.json                    # Dependencias
└── .env                           # Variables de entorno

## 📊 Modelos de Datos

### Usuario (User)

```javascript
{
  UserName: String (requerido, max 64 caracteres),
  UserSurname: String (requerido, max 64 caracteres),
  UserEmail: String (requerido, único, lowercase),
  password: String (requerido, encriptada con Argon2),
  UserCreatedAt: Date (default: Date.now),
  isActive: Boolean (default: true, para soft delete)
}
```

### Opinión (Opinion)

```javascript
{
  opinionTitle: String (requerido, max 100 caracteres),
  opinionCategory: String (enum: ['Sugerencia', 'Queja', 'Elogio', 'General']),
  opinionBody: String (requerido, max 1000 caracteres),
  author: ObjectId (referencia a User),
  rating: Number (1-5, default: 5),
  opinionDate: Date (default: Date.now),
  isActive: Boolean (default: true, soft delete)
}
```

### Comentario (Comment)

```javascript
{
  text: String (requerido),
  opinion: ObjectId (referencia a Opinion),
  author: ObjectId (referencia a User),
  createdAt: Date (default: Date.now),
  isActive: Boolean (default: true, soft delete)
}
```

## 🔌 Endpoints de API

### Base URL
```
http://localhost:3001/opinionSystem/v1
```

### 🔐 Autenticación

#### Register (Registro)
```
POST /auth/register
Content-Type: application/json

{
  "UserName": "Juan",
  "UserSurname": "Pérez",
  "UserEmail": "juan@example.com",
  "password": "micontraseña123"
}

Response 201:
{
  "success": true,
  "message": "Usuario registrado exitosamente",
  "user": {
    "UserName": "Juan",
    "UserEmail": "juan@example.com"
  }
}
```

#### Login
```
POST /auth/login
Content-Type: application/json

{
  "UserEmail": "juan@example.com",
  "password": "micontraseña123"
}

Response 200:
{
  "success": true,
  "message": "Login exitoso",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "UserName": "Juan",
    "UserEmail": "juan@example.com"
  }
}
```

### 👥 Usuarios

#### Obtener Todos los Usuarios (Paginado)
```
GET /users?page=1&limit=10

Response 200:
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "UserName": "Juan",
      "UserSurname": "Pérez",
      "UserEmail": "juan@example.com",
      "UserCreatedAt": "2024-01-15T10:30:00Z",
      "isActive": true
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 3,
    "totalRecords": 25,
    "limit": 10
  }
}
```

#### Obtener Usuario por ID
```
GET /users/:id

Response 200:
{
  "success": true,
  "data": { /* usuario */ }
}
```

#### Crear Usuario
```
POST /users
Content-Type: application/json

{
  "UserName": "Carlos",
  "UserSurname": "García",
  "UserEmail": "carlos@example.com",
  "password": "contraseña123"
}

Response 201:
{ /* usuario creado */ }
```

#### Actualizar Usuario
```
PUT /users/:id
Content-Type: application/json

{
  "UserName": "Carlos",
  "UserSurname": "García López"
}

Response 200:
{ /* usuario actualizado */ }
```

#### Cambiar Estado de Usuario (Soft Delete)
```
PATCH /users/status/:id
Content-Type: application/json

{ "isActive": false }

Response 200:
{ /* usuario actualizado */ }
```

### 💭 Opiniones

#### Obtener Todas las Opiniones (Paginadas)
```
GET /opinions?page=1&limit=10

Response 200:
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "opinionTitle": "Excelente servicio",
      "opinionCategory": "Elogio",
      "opinionBody": "El servicio fue muy bueno...",
      "author": {
        "_id": "507f1f77bcf86cd799439011",
        "UserName": "Juan",
        "UserSurname": "Pérez"
      },
      "rating": 5,
      "opinionDate": "2024-01-15T10:30:00Z",
      "isActive": true
    }
  ],
  "pagination": { /* ... */ }
}
```

#### Obtener Opinión por ID
```
GET /opinions/:id

Response 200:
{
  "success": true,
  "data": { /* opinión completa con autor */ }
}
```

#### Crear Opinión
```
POST /opinions
Content-Type: application/json

{
  "opinionTitle": "Excelente servicio",
  "opinionCategory": "Elogio",
  "opinionBody": "El servicio fue muy bueno y la atención excelente",
  "author": "507f1f77bcf86cd799439011",
  "rating": 5
}

Response 201:
{ /* opinión creada */ }
```

#### Actualizar Opinión
```
PUT /opinions/:id
Content-Type: application/json

{
  "opinionTitle": "Buen servicio",
  "rating": 4
}

Response 200:
{ /* opinión actualizada */ }
```

#### Cambiar Estado de Opinión
```
PATCH /opinions/status/:id
Content-Type: application/json

{ "isActive": false }

Response 200:
{ /* opinión actualizada */ }
```

### 💬 Comentarios

#### Crear Comentario
```
POST /comments
Content-Type: application/json

{
  "text": "Totalmente de acuerdo con esta opinión",
  "opinion": "507f1f77bcf86cd799439012",
  "author": "507f1f77bcf86cd799439011"
}

Response 201:
{
  "success": true,
  "message": "Comentario publicado exitosamente",
  "comment": { /* comentario */ }
}
```

#### Obtener Comentarios de una Opinión
```
GET /comments/opinion/:opinionId

Response 200:
{
  "success": true,
  "total": 3,
  "comments": [
    {
      "_id": "507f1f77bcf86cd799439013",
      "text": "Muy buena observación",
      "opinion": "507f1f77bcf86cd799439012",
      "author": {
        "_id": "507f1f77bcf86cd799439011",
        "UserName": "Juan",
        "UserSurname": "Pérez"
      },
      "createdAt": "2024-01-15T11:00:00Z",
      "isActive": true
    }
  ]
}
```

#### Actualizar Comentario
```
PUT /comments/:id
Content-Type: application/json

{ "text": "Comentario actualizado" }

Response 200:
{ /* comentario actualizado */ }
```

#### Eliminar Comentario (Soft Delete)
```
DELETE /comments/:id

Response 200:
{
  "success": true,
  "message": "Comentario eliminado"
}
```

## 🔐 Autenticación

### JWT (JSON Web Tokens)

La API utiliza JWT para autenticación. Después de hacer login, recibirás un token que debe incluirse en las solicitudes protegidas:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Duración del Token**: 3 horas

### Encriptación de Contraseña

Las contraseñas se encriptan usando **Argon2**, un algoritmo de hash criptográfico seguro y resistente a ataques.

## 📝 Ejemplos de Uso

### Con cURL

**1. Registro de Usuario**
```bash
curl -X POST http://localhost:3001/opinionSystem/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "UserName": "Juan",
    "UserSurname": "Pérez",
    "UserEmail": "juan@example.com",
    "password": "micontraseña123"
  }'
```

**2. Login**
```bash
curl -X POST http://localhost:3001/opinionSystem/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "UserEmail": "juan@example.com",
    "password": "micontraseña123"
  }'
```

**3. Crear Opinión**
```bash
curl -X POST http://localhost:3001/opinionSystem/v1/opinions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TU_TOKEN_AQUI" \
  -d '{
    "opinionTitle": "Excelente servicio",
    "opinionCategory": "Elogio",
    "opinionBody": "El servicio fue muy bueno",
    "author": "ID_DEL_USUARIO",
    "rating": 5
  }'
```

### Con Postman

1. Importa la collection en Postman
2. Configura las variables de entorno:
   - `base_url`: `http://localhost:3001/opinionSystem/v1`
   - `token`: Tu JWT token después del login
3. Usa las solicitudes predefinidas

## 🔒 Seguridad

### Medidas Implementadas

- **Helmet**: Protege contra vulnerabilidades comunes de HTTP
- **CORS**: Control de origen cruzado configurado
- **Rate Limiting**: Limita solicitudes por IP
- **Validación**: Express-validator en todos los endpoints
- **Encriptación**: Contraseñas con Argon2
- **JWT**: Autenticación segura con tokens
- **Soft Delete**: Los registros no se eliminan, solo se desactivan
- **Mongoose Validation**: Validación a nivel de esquema

### Variables de Entorno Sensibles

Nunca incluyas credenciales en el código:

```env
# ✅ Correcto
SECRET_KEY=tu_clave_secreta_aleatoria_segura

# ❌ Incorrecto
SECRET_KEY=123456
SECRET_KEY=password
```

## 📦 Tecnologías Utilizadas

| Tecnología | Versión | Descripción |
|---|---|---|
| **Express** | ^5.2.1 | Framework web rápido |
| **MongoDB** | - | Base de datos NoSQL |
| **Mongoose** | ^9.2.1 | ODM para MongoDB |
| **JWT** | ^9.0.3 | Tokens de autenticación |
| **Argon2** | - | Hash seguro de contraseñas |
| **Helmet** | ^8.1.0 | Seguridad HTTP |
| **CORS** | ^2.8.6 | Control de origen cruzado |
| **Morgan** | ^1.10.1 | Logger HTTP |
| **Express Validator** | ^7.3.1 | Validación de datos |
| **Express Rate Limit** | ^8.2.1 | Rate limiting |
| **Multer** | ^2.0.2 | Carga de archivos |
| **Cloudinary** | ^1.41.3 | Servicio de imágenes |

## 🐛 Solución de Problemas

### Error de Conexión a MongoDB

```
MongoDB | no se puedo conectar a mongoDB
```

**Solución**: Verifica tu `URL_MONGODB` en el archivo `.env`

### Error "SECRET_KEY no definida"

```
Error: SECRET_KEY debe estar en las variables de entorno
```

**Solución**: Añade `SECRET_KEY` a tu archivo `.env`

### Token Expirado

```
Error: jwt expired
```

**Solución**: Vuelve a hacer login para obtener un nuevo token

## 📞 Soporte

Para reportar problemas o sugerencias, por favor crea un issue en el repositorio.

## 📄 Licencia

Este proyecto está licenciado bajo la Licencia MIT.

---

**Desarrollado con ❤️ por milian-rm**
