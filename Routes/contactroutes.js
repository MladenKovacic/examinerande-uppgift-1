import express from "express";
import { createContact } from "../Controllers/contactControllers.js";

const router = express.Router();

router.post("/", createContact);

export default router;
