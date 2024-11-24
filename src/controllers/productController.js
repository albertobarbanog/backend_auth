const Product = require('../models/productModel');

// Manejar errores
const handleError = (
  res,
  error,
  message = 'Ocurrió un error',
  statusCode = 500
) => {
  console.error(error);
  res.status(statusCode).json({ message, error });
};

// Crear un producto
const createProduct = async (req, res) => {
  const { name, description, price, userId } = req.body;

  try {
    const product = new Product({ name, description, price, user: userId });
    await product.save();

    res.status(201).json({ message: 'Producto creado con éxito', product });
  } catch (error) {
    handleError(res, error, 'Error al crear el producto');
  }
};

// Leer todos los productos
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('user', 'name email');
    res.status(200).json(products);
  } catch (error) {
    handleError(res, error, 'Error al obtener los productos');
  }
};

// Leer un producto específico por ID
const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id).populate('user', 'name email');
    if (!product) {
      return handleError(
        res,
        new Error('Producto no encontrado'),
        'El producto solicitado no existe',
        404
      );
    }

    res.status(200).json(product);
  } catch (error) {
    handleError(res, error, 'Error al obtener el producto');
  }
};

// Actualizar un producto
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price } = req.body;

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    if (name) product.name = name;
    if (description) product.description = description;
    if (price) product.price = price;

    await product.save();

    res
      .status(200)
      .json({ message: 'Producto actualizado con éxito', product });
  } catch (error) {
    handleError(res, error, 'Error al actualizar el producto');
  }
};

// Eliminar un producto
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    await product.deleteOne();

    res.status(200).json({ message: 'Producto eliminado con éxito' });
  } catch (error) {
    handleError(res, error, 'Error al eliminar el producto');
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
