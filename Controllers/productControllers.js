import { Product } from "../IMS/models/product.js";
import mongoose from "mongoose";

export const getProduct = async (req, res) => {
  try {
    const {
      name,
      sku,
      description,
      price,
      category,
      manufacturer,
      amountInStock,
    } = req.query;
    const filter = {};

    const products = await Product.find(filter);
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ error: "Bad query", details: error.message });
  }
};

//Create product
export const createProduct = async (req, res) => {
  const {
    name,
    sku,
    description,
    price,
    category,
    manufacturer,
    amountInStock,
  } = req.body;
  try {
    const newProduct = await Product.create({
      name: req.body.name,
      sku: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      manufacturer: req.body.manufacturer,
      amountInStock: req.body.amountInStock,
    });
    res.status(201).json(newProduct);
  } catch (error) {
    console.log(error);
  }
};

//Get one product by id
export const GetProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const findbyid = await Product.findById(id);
    res.status(201).json(findbyid);
  } catch (error) {
    console.log(error);
  }
};

//Update one product
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

//Delete one product
export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct)
      return res.status(404).json({ message: "Product not found" });
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

//Get total value of products in stock
export const SummariseProducts = async (req, res) => {
  try {
    const findProducts = await Product.find();
    if (findProducts.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }
    const totalValue = findProducts.reduce(
      (acc, product) => acc + product.price * product.amountInStock,
      0
    );

    console.log(totalValue);
    res.status(200).json({ totalValue });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get a list of products < 10
export const lowerStock = async (req, res) => {
  try {
    const findProducts = await Product.find({ amountInStock: { $lt: 10 } });

    res.status(200).json({ findProducts });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get a list of products > 10
export const higherStock = async (req, res) => {
  try {
    const findProducts = await Product.find({ amountInStock: { $gt: 10 } });

    res.status(200).json({ findProducts });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
//Summarise total value by manufactures
export const totalValueByManufacturer = async (req, res) => {
  try {
    const totalValue = await Product.aggregate([
      {
        $lookup: {
          from: "manufacturers",
          localField: "manufacturer",
          foreignField: "_id",
          as: "manufacturer",
        },
      },
      {
        $unwind: "$manufacturer",
      },
      {
        $group: {
          _id: "$manufacturer",
          //manufacturer: "$manufacturer.name",
          totalValue: { $sum: { $multiply: ["$price", "$amountInStock"] } },
        },
      },
      {
        $project: {
          _id: 0,
          name: "$_id.name",
          totalValue: "$totalValue",
        },
      },
    ]);
    res.status(200).json({ totalValueByManufacturer: totalValue });
  } catch (error) {
    console.log(error);
  }
};

//Compact list with aggregate
export const criticalStock = async (req, res) => {
  try {
    const list = await Product.aggregate([
      {
        $match: { amountInStock: { $lt: 5 } },
      },
      {
        $lookup: {
          from: "manufacturers",
          localField: "manufacturer",
          foreignField: "_id",
          as: "manufacturer",
        },
      },
      {
        $unwind: "$manufacturer",
      },
      {
        $lookup: {
          from: "contacts",
          localField: "manufacturer.contact",
          foreignField: "_id",
          as: "manufacturer.contact",
        },
      },
      {
        $unwind: "$manufacturer.contact",
      },
      {
        $project: {
          _id: 1,
          manufacturerName: "$manufacturer.name",
          contact: {
            name: "$manufacturer.contact.name",
            phone: "$manufacturer.contact.phone",
            email: "$manufacturer.contact.email",
          },
        },
      },
    ]);
    res.status(200).json({ list });
  } catch (error) {
    console.log(error);
  }
};

/* export const criticalPopulate = async (req, res) => {
  try {
    const list = await Product.find({ amountInStock: { $lt: 5 } })
      .populate({
        path: "manufacturer",
        select: "name",
        populate: { path: "contact", select: "name phone email" },
      })
      .select("_id.manufacturer");

    const formattedList = list.map((item) => ({
      _id: item.id,
      productName: item.name,
      manufacturer: item.manufacturer.name,
      contact: {
        name: item.manufacturer.contact.name,
        phone: item.manufacturer.contact.phone,
        email: item.manufacturer.contact.email,
      },
    }));
    res.status(200).json(formattedList);
  } catch (error) {
    console.log(error);
  }
};
 */
