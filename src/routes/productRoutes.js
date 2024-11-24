const express = require('express');
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');

const router = express.Router();

// Crear un producto
router.post('/create', createProduct);

// Obtener todos los productos
router.get('/readall', getAllProducts);

// Obtener un producto por su ID
router.get('/readone/:id', getProductById);

// Actualizar un producto por su ID
router.put('/update/:id', updateProduct);

// Eliminar un producto por su ID
router.delete('/delete/:id', deleteProduct);

module.exports = router;
