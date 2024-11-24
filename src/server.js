require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const swaggerDocs = require('./swagger'); // Swagger en la misma carpeta

const userRoutes = require('./routes/userRoutes'); // Rutas dentro de src/routes
const productRoutes = require('./routes/productRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Documentación con Swagger
swaggerDocs(app);

// Rutas
app.use('/api/user', userRoutes);
app.use('/api/product', productRoutes);

// Conexión
const PORT = process.env.PORT || 3500;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Conectado a la base de datos');
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
      console.log(
        `Documentación disponible en http://localhost:${PORT}/api-docs`
      );
    });
  })
  .catch((err) => {
    console.error('Error al conectar', err);
  });
