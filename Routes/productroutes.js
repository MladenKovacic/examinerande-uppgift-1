import express from "express";
import {
  GetProductById,
  getProduct,
  deleteProduct,
  updateProduct,
  SummariseProducts,
  lowerStock,
  higherStock,
  totalValueByManufacturer,
  criticalStock,
  criticalPopulate
} from "../Controllers/productControllers.js";

const router = express.Router();
// Specific routes FIRST
router.get("/critical-stock-populate", criticalPopulate);
router.get("/critical-stock", criticalStock);
router.get("/total-stock-value-by-manufacturer", totalValueByManufacturer);
router.get("/total", SummariseProducts);
router.get("/lowerstock", lowerStock);
router.get("/higherStock", higherStock);

// General routes AFTER
router.get("/:id", GetProductById);
router.get("/", getProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);
export default router;
