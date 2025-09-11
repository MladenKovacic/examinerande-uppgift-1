import express from "express";
import contactroutes from "./contactroutes.js";

const router = express.Router();

router.use("/contacts", contactroutes);

export default router;
