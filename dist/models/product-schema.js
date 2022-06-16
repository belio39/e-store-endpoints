"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.ProductSchema = joi_1.default.object({
    name: joi_1.default.string().min(3).max(20).required(),
    imageUrl: joi_1.default.string().alphanum().min(0).max(225).required(),
    price: joi_1.default.string().min(3).max(15).required(),
    quantity: joi_1.default.string().min(3).max(10).required(),
});
