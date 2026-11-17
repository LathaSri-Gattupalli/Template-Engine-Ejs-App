import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from "../models/productModel.js";

// GET ALL PRODUCTS
export const getProducts = (req, res) => {
  res.json(getAllProducts());
};

// GET PRODUCT BY ID
export const getProduct = (req, res) => {
  const product = getProductById(req.params.id);

  if (!product) {
    return res.status(404).json({
      message: "Product not found"
    });
  }

  res.json(product);
};

// CREATE PRODUCT
export const addProduct = (req, res) => {
  const { name, price, category } = req.body;

  if (!name || price === undefined || !category ||
      !Number.isFinite(Number(price)) || Number(price) <= 0) {
    return res.status(400).json({
      message: "Valid name, positive price and category are required"
    });
  }

  const product = createProduct(req.body);

  res.status(201).json({
    message: "Product created successfully",
    product
  });
};

// UPDATE PRODUCT
export const editProduct = (req, res) => {
  const product = updateProduct(req.params.id, req.body);

  if (!product) {
    return res.status(404).json({
      message: "Product not found"
    });
  }

  res.json({
    message: "Product updated successfully",
    product
  });
};

// DELETE PRODUCT
export const removeProduct = (req, res) => {
  const deleted = deleteProduct(req.params.id);

  if (!deleted) {
    return res.status(404).json({
      message: "Product not found"
    });
  }

  res.json({
    message: "Product deleted successfully"
  });
};