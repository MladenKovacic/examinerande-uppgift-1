import mongoose from "mongoose";
const { Schema } = mongoose;

const ContactSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true },
  phone: { type: String, unique: true },
});

const ManufactureSchema = new Schema({
  name: { type: String, required: true },
  country: { type: String },
  website: { type: String, unique: true },
  description: { type: String },
  adress: String,
  contact: ContactSchema,
});

const ProductSchema = new Schema({
  name: { type: String, required: true },
  sku: { type: String, unique: true, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  category: String,
  manufacturer: { type: mongoose.Schema.Types.ObjectId, ref: "Manufacturer" },
  amountInStock: { type: Number, default: 0 },
});

export default mongoose.model(ProductSchema, "Products");
