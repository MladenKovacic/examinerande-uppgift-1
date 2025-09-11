import { Product } from "../IMS/models/product.js";
import mongoose from "mongoose";

export const createProduct = async (req, res) => {
  try {
    const newProduct = await Product.create({
      name: req.body.name,
      sku: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      amountInStock: req.body.amountInStock,
    });
    res.status(201).json(newProduct);
  } catch (error) {
    console.log(error);
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, sku, description, price, category, amountInStock } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        name,
        sku,
        description,
        price,
        category,
        amountInStock,
      },
      { new: true, runValidators: true }
    );
    if (!updatedProduct) {
      return res.status(404);
    }
    res.status(201).json(updatedProduct);
  } catch (error) {
    console.log(error);
  }
};
