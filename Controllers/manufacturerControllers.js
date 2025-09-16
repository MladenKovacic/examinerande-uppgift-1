import { Manufacturer } from "../IMS/models/manufacturer.js";
import mongoose from "mongoose";

export const getManufacturers = async (req, res) => {
  try {
    const manufacturers = await Manufacturer.find();
    if (!manufacturers) {
      return res.status(404).json({ message: "No manufacturers found" });
    }
    res.status(200).json(manufacturers);
  } catch (error) {
    console.log(error);
  }
};
