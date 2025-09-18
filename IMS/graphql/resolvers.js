import { Product } from "../models/product.js";
import { Contact } from "../models/contact.js";
import { Manufacturer } from "../models/manufacturer.js";
import mongoose from "mongoose";

export const resolvers = {
  Query: {
    Products: async (_parent, args) => {
      const product = await Product.find();
      return product;
    },
    Manufacturers: async (_parent, args) => {
      const manufacturer = await Manufacturer.find();
      return manufacturer;
    },
    Contacts: async (_parent, args) => {
      const contact = await Contact.find();
      return contact;
    },
    Product: async (_p, { id }) => {
      return Product.findById(id);
    },
    /*  TotalStockValue: async (_p, args) => {
      const pipeline = [
        {
          $group: {
            _id: "$Products",
            totalValue: {
              $sum: { $multiply: ["$price", "$amountInStock"] },
            },
          },
        },
        {
          $project: {
            id: 0,
            totalValue: 1,
          },
        },
      ];

      const TotalStockValue = await Product.aggregate(pipeline);

      return TotalStockValue;
    }, */

    TotalStockValue: async () => {
      return await Product.aggregate([
        {
          $project: {
            total: { $multiply: ["$price", "$amountInStock"] },
          },
        },
        {
          $group: {
            _id: null,
            grandTotal: { $sum: "$total" },
          },
        },
      ]);
    },
  },
};
