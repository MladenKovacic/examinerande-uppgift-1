// seed.js
import mongoose from "mongoose";
import { faker } from "@faker-js/faker";
import { Contact } from "./IMS/models/contact.js";
import { Manufacturer } from "./IMS/models/manufacturer.js";
import { Product } from "./IMS/models/product.js";
import dotenv from "dotenv";
// Replace with your actual MongoDB URI
dotenv.config();

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "IMS",
    });

    console.log("Connected to MongoDB.");

    // Clear existing data
    await Contact.deleteMany({});
    await Manufacturer.deleteMany({});
    await Product.deleteMany({});

    // 1. Create Contacts
    const contactData = Array.from({ length: 10 }).map(() => ({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
    }));

    const contacts = await Contact.insertMany(contactData);
    console.log("Inserted Contacts:", contacts.length);

    // 2. Create ManufacturerModels (linked to random contact)
    const manufacturerData = Array.from({ length: 10 }).map(() => ({
      name: faker.company.name(),
      country: faker.location.country(),
      website: faker.internet.url(),
      description: faker.lorem.sentence(),
      address: faker.location.streetAddress(),
      contact: faker.helpers.arrayElement(contacts)._id,
    }));

    const manufacturerModels = await Manufacturer.insertMany(manufacturerData);
    console.log("Inserted ManufacturerModels:", manufacturerModels.length);

    // 3. Create ProductModels (linked to random manufacturerModel)
    const categories = [
      "Electronics",
      "Clothing",
      "Toys",
      "Books",
      "Home",
      "Tools",
    ];

    const productModelData = Array.from({ length: 100 }).map(() => ({
      name: faker.commerce.productName(),
      sku: faker.string.alphanumeric(8).toUpperCase(),
      description: faker.commerce.productDescription(),
      price: faker.commerce.price({ min: 10, max: 1000, dec: 2 }),
      category: faker.helpers.arrayElement(categories),
      manufacturer: faker.helpers.arrayElement(manufacturerModels)._id,
      amountInStock: faker.number.int({ min: 0, max: 100 }),
    }));

    const productModels = await Product.insertMany(productModelData);
    console.log("Inserted ProductModels:", productModels.length);

    console.log("Seeding completed successfully.");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB.");
  }
}

seedDatabase();
