const express = require('express');
const {
  registerUser,
  loginUser,
  verifyToken,
  updateUser,
} = require('../controllers/userController');

const router = express.Router();

// Registrar un nuevo usuario
router.post('/register', registerUser);

// Iniciar sesión
router.post('/login', loginUser);

// Vrificar el token
router.get('/verifytoken', verifyToken);

// Actualizar información del usuario
router.put('/update', updateUser);

module.exports = router;
