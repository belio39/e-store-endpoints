import express from "express";
import {
  createProducts,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from "../controllers/product-controller";
import { VerifyToken } from "../middleware/verify";
const router = express.Router();
router.post("/", createProducts);
router.get("/", getAllProducts);
router.get("/:id", VerifyToken, getProductById);
router.patch("/:id", VerifyToken, updateProduct);
router.delete("/:id", VerifyToken, deleteProduct);
export default router;
