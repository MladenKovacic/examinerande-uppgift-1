import mongoose from "mongoose";
const { Schema } = mongoose;
const ManufactureSchema = new mongoose.Schema({
  name: { type: String, required: true },
  country: { type: String },
  website: { type: String, unique: true },
  description: { type: String },
  adress: String,
  contact: ContactSchema,
});

export const Manufacturer = mongoose.model("Manufacturer", ManufactureSchema);
