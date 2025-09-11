import { Contact } from "../IMS/models/contact.js";
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

// export const updateContact = async (req, res) => {

//   try {
//     const { id } = req.params;
//     const { name, email, phone } = req.body;

//     const updatedContact = await ContactModel.findByIdAndUpdate(
//       id,
//       { name, email, phone },
//       { new: true, runValidators: true }
//     );
//     if (!updatedContact) {
//       return res.status(404)
//     }

//   }
// }
