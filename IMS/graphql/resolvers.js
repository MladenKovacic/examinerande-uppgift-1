import { Product } from "../models/product.js";
import mongoose from "mongoose"

export const resolvers = {
    Query: {
        getProduct: async (_parent, args) => {
            const product = await Product.find()
            return product
        }
    }
};
