"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order_ItemsSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.Order_ItemsSchema = joi_1.default.object({
    order_id: joi_1.default.string().required(),
    product_id: joi_1.default.string().required(),
});
