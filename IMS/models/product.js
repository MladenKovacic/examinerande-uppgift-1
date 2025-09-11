import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sku: { type: String, unique: true, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  category: String,
  manufacturer: { type: mongoose.Schema.Types.ObjectId, ref: "Manufacturer" },
  amountInStock: { type: Number, default: 0 },
});

export const Product = mongoose.model("Product", productSchema);
