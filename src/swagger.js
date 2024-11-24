const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Autenticación de Usuarios y Productos',
      version: '1.0.0',
      description: 'Documentación generada automáticamente con Swagger',
    },
    servers: [
      {
        url: 'http://localhost:3000', // Cambia el puerto si usas otro
        description: 'Servidor local',
      },
    ],
  },
  apis: ['./src/routes/*.js'], // Ruta donde están tus rutas con comentarios
};

const swaggerSpec = swaggerJsdoc(options);

const swaggerDocs = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log('Documentación disponible en http://localhost:3000/api-docs');
};

module.exports = swaggerDocs;
