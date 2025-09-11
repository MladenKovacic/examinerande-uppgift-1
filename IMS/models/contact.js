import mongoose from "mongoose";
const { Schema } = mongoose;

const ContactSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
});

export const ContactModel = mongoose.model("Contacts", ContactSchema);
