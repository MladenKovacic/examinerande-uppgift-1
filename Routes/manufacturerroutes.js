import express from "express";
import { getManufacturers } from "../Controllers/manufacturerControllers";
const router = express.Router();

router.get("/", getManufacturers);

export default router;
