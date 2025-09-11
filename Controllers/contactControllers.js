import { ContactModel } from "../IMS/models/contact.js";
import mongoose from "mongoose";

export const createContact = async (req, res) => {
  try {
    const newContact = await ContactModel.create({
      name: req.body.name,
      email: req.body.name,
      phone: req.body.phone,
    });
    res.status(201).json(newContact);
  } catch (error) {
    console.log(error);
  }
};
