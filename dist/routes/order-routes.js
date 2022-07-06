"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const order_controller_1 = require("../controllers/order-controller");
const verify_1 = require("../middleware/verify");
const router = express_1.default.Router();
router.post("/", verify_1.VerifyToken, order_controller_1.createOrders);
router.get("/", verify_1.VerifyToken, order_controller_1.getAllOrders);
router.get("/:id", verify_1.VerifyToken, order_controller_1.getOrderById);
router.delete("/:id", verify_1.VerifyToken, order_controller_1.deleteOrder);
exports.default = router;
