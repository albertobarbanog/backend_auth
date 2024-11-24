const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Manejar errores
const handleError = (
  res,
  error,
  message = 'Ocurrió un error',
  statusCode = 500
) => {
  console.error(`[ERROR ${statusCode}]`, error.message || error);

  res.status(statusCode).json({
    success: false,
    message,
    error: error.message || 'Error desconocido',
  });
};

// Registrar un nuevo usuario
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return handleError(
        res,
        new Error('El correo ya está registrado'),
        'El correo ya está en uso',
        409
      );
    }

    const user = new User({ name, email, password });
    await user.save();

    res
      .status(201)
      .json({ message: 'Usuario registrado con éxito', userId: user._id });
  } catch (error) {
    handleError(res, error, 'Error al registrar el usuario');
  }
};

// Iniciar sesión
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return handleError(
        res,
        new Error('Usuario no encontrado'),
        'Usuario no encontrado',
        404
      );
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return handleError(
        res,
        new Error('Contraseña incorrecta'),
        'Contraseña incorrecta',
        401
      );
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({ message: 'Inicio de sesión exitoso', token });
  } catch (error) {
    handleError(res, error, 'Error al iniciar sesión');
  }
};

// Verificar token
const verifyToken = (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).json({ message: 'Token válido', userId: decoded.userId });
  } catch (error) {
    res.status(401).json({ message: 'Token inválido o expirado', error });
  }
};

// Actualizar información del usuario
const updateUser = async (req, res) => {
  const { userId, name, email, password } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password = await bcrypt.hash(password, 10);

    await user.save();

    res.status(200).json({ message: 'Usuario actualizado con éxito', user });
  } catch (error) {
    handleError(res, error, 'Error al actualizar el usuario');
  }
};

module.exports = { registerUser, loginUser, verifyToken, updateUser };
