const express = require('express');
const {
  registerUser,
  loginUser,
  verifyToken,
  updateUser,
} = require('../controllers/userController');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           description: El nombre del usuario
 *         email:
 *           type: string
 *           description: El correo electrónico del usuario
 *         password:
 *           type: string
 *           description: La contraseña del usuario
 *       example:
 *         name: Alberto Barbano
 *         email: albertobarbano@example.com
 *         password: clave123
 */

/**
 * @swagger
 * /api/user/register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Usuario registrado con éxito
 *       409:
 *         description: El correo ya está en uso
 *       500:
 *         description: Error interno del servidor
 */
router.post('/register', registerUser);

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: Iniciar sesión
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               email: albertobarbano@example.com
 *               password: clave123
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *       401:
 *         description: Contraseña incorrecta
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.post('/login', loginUser);

/**
 * @swagger
 * /api/user/verifytoken:
 *   get:
 *     summary: Verificar token de usuario
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Token válido
 *       401:
 *         description: Token no proporcionado o inválido
 */
router.get('/verifytoken', verifyToken);

/**
 * @swagger
 * /api/user/update:
 *   put:
 *     summary: Actualizar información del usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *             properties:
 *               userId:
 *                 type: string
 *                 description: ID del usuario a actualizar
 *               name:
 *                 type: string
 *                 description: Nuevo nombre del usuario
 *               email:
 *                 type: string
 *                 description: Nuevo correo electrónico del usuario
 *               password:
 *                 type: string
 *                 description: Nueva contraseña del usuario
 *             example:
 *               userId: 63abcdef1234567890
 *               name: Alberto Barbano
 *               email: albertobarbano@example.com
 *               password: clave123
 *     responses:
 *       200:
 *         description: Usuario actualizado con éxito
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.put('/update', updateUser);

module.exports = router;
