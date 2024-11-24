## **API de Autenticación y Productos**

Una API RESTful creada con Node.js, Express y MongoDB que permite la autenticación de usuarios y operaciones CRUD para productos. La API utiliza JSON Web Tokens (JWT) para autenticar a los usuarios y maneja la creación, lectura, actualización y eliminación de productos. Debes contar con una base de datos MongoDB para almacenar los datos de los usuarios y productos. Puedes crear una local o usar una base de datos en la nube como MongoDB Atlas.

---

### **Características**

- Registro e inicio de sesión de usuarios.
- Autenticación con JSON Web Tokens (JWT).
- Operaciones CRUD completas para productos.
- Documentación interactiva con Swagger.

---

### **Instalación**

1. Clona este repositorio:

   ```bash
   git clone https://github.com/albertobarbanog/backend_auth
   cd backend_auth
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Configura las variables de entorno en un archivo `.env`:

   ```env
   PORT=3000
   MONGO_URI=tu_uri_de_mongodb
   JWT_SECRET=tu_secreto
   ```

4. Inicia el servidor:
   ```bash
   npm run dev
   ```

---

### **Endpoints Principales**

#### **Usuarios**

- `POST /api/user/register` - Registrar un usuario.
- `POST /api/user/login` - Iniciar sesión.
- `GET /api/user/verifytoken` - Verificar token.
- `PUT /api/user/update` - Actualizar un usuario.

#### **Productos**

- `POST /api/product/create` - Crear un producto.
- `GET /api/product/readall` - Listar todos los productos.
- `GET /api/product/readone/:id` - Obtener producto por ID.
- `PUT /api/product/update/:id` - Actualizar un producto.
- `DELETE /api/product/delete/:id` - Eliminar un producto.

---

### **Documentación**

La API cuenta con documentación interactiva generada con Swagger, disponible en:

```
http://localhost:3500/api-docs
```

---
