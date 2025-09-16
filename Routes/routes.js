import express from "express";
import contactroutes from "./contactroutes.js";
import productroutes from "./productroutes.js";
import manufacturerroutes from "./manufaturerroutes.js";

const router = express.Router();

router.use("/contacts", contactroutes);
router.use("/products", productroutes);
router.use("/manufacturers", manufacturerroutes);

export default router;
