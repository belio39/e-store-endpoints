import express from "express";
import {
  createProducts,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from "../controllers/product-controller";
const router = express.Router();
router.post("/", createProducts);
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.patch("/:id", updateProduct);
router.delete("/:id", deleteProduct);
export default router;
