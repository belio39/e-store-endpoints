"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("../controllers/product-controller");
const verify_1 = require("../middleware/verify");
const router = express_1.default.Router();
router.post("/", verify_1.VerifyToken, product_controller_1.createProducts);
router.get("/", verify_1.VerifyToken, product_controller_1.getAllProducts);
router.get("/:id", verify_1.VerifyToken, product_controller_1.getProductById);
router.patch("/:id", verify_1.VerifyToken, product_controller_1.updateProduct);
router.delete("/:id", verify_1.VerifyToken, product_controller_1.deleteProduct);
exports.default = router;
