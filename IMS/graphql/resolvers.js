import { Product } from "../models/product.js";
import { Contact } from "../models/contact.js";
import { Manufacturer } from "../models/manufacturer.js";
import mongoose from "mongoose";
import {
  deleteProduct,
  updateProduct,
} from "../../Controllers/productControllers.js";

export const resolvers = {
  Query: {
    Products: async (_parent, args) => {
      const product = await Product.find().populate({
        path: "manufacturer",
        populate: {
          path: "contact",
        },
      });
      return product;
    },
    Manufacturers: async (_parent, args) => {
      const manufacturer = await Manufacturer.find().populate({
        path: "contact",
      });
      return manufacturer;
    },
    Contacts: async (_parent, args) => {
      const contact = await Contact.find();
      return contact;
    },
    Product: async (_p, { id }) => {
      return Product.findById(id);
    },

    totalStockValue: async () => {
      const [totalStockValue] = await Product.aggregate([
        { $match: {} },
        {
          $group: {
            _id: null,
            totalStockValue: {
              $sum: { $multiply: ["$price", "$amountInStock"] },
            },
          },
        },
      ]);

      return totalStockValue.totalStockValue;
    },
    totalStockValuebyManufacturer: async () => {
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
      return totalValue;
    },
    lowStockProducts: async () => {
      const lowStockProducts = await Product.find({
        amountInStock: { $lt: 10 },
      });
      return lowStockProducts;
    },
    criticalProducts: async () => {
      return await Product.aggregate([
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
      ]);
      // return criticalProducts;
    },
  },
  Mutation: {
    addProduct: async (_parent, { input }) => {
      return await Product.create(input);
    },
    updateProduct: async (_parent, { id, input }) => {
      return await Product.findByIdAndUpdate(id, input, {
        new: true,
        runValidators: true,
      });
    },
    deleteProduct: async (_parent, { id }) => {
      return await Product.findByIdAndDelete(id);
    },
  },
};
