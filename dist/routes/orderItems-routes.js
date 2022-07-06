"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const orderItems_controller_1 = require("../controllers/orderItems-controller");
const verify_1 = require("../middleware/verify");
const router = express_1.default.Router();
router.post("/", verify_1.VerifyToken, orderItems_controller_1.createorderitems);
exports.default = router;
