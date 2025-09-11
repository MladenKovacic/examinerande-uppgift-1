import mongoose from "mongoose";

const manufacturerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  country: { type: String },
  website: { type: String, unique: true },
  description: { type: String },
  adress: String,
  contact: { type: mongoose.Schema.Types.ObjectId, ref: "Contact" },
});

export const Manufacturer = mongoose.model("Manufacturer", manufacturerSchema);
