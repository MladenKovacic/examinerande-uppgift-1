import { Contact } from "../IMS/models/contact.js";
import mongoose from "mongoose";

export const createContact = async (req, res) => {
  try {
    const { name, phone, email } = req.body;

    const newContact = await ContactModel.create({ name, email, phone });
    res.status(201).json(newContact);
  } catch (error) {
    console.log(error);
  }
};
