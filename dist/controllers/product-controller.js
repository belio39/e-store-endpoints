"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.getProductById = exports.getAllProducts = exports.createProducts = void 0;
const uuid_1 = require("uuid");
const mssql_1 = __importDefault(require("mssql"));
const product_schema_1 = require("../models/product-schema");
const config_1 = __importDefault(require("../config/config"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const createProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = (0, uuid_1.v4)();
        const { name, imageUrl, price, quantity } = req.body;
        let pool = yield mssql_1.default.connect(config_1.default);
        const { error } = product_schema_1.ProductSchema.validate(req.body);
        if (error) {
            return res.status(400).json(error.details[0].message);
        }
        else {
            yield pool
                .request()
                .input("id", mssql_1.default.VarChar, id)
                .input("name", mssql_1.default.VarChar, name)
                .input("price", mssql_1.default.VarChar, price)
                .input("imageUrl", mssql_1.default.VarChar, imageUrl)
                .input("quantity", mssql_1.default.VarChar, quantity)
                .execute("createProducts");
            res.status(200).json({
                message: "Product Created Successfully!",
            });
        }
    }
    catch (error) {
        res.json({ error: error.message });
    }
});
exports.createProducts = createProducts;
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let pool = yield mssql_1.default.connect(config_1.default);
        const products = yield pool.request().execute("getAllProducts");
        res.status(200).json({
            message: "Succcess",
            products,
        });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.getAllProducts = getAllProducts;
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        let pool = yield mssql_1.default.connect(config_1.default);
        const product = yield pool
            .request()
            .input("id", mssql_1.default.VarChar, id)
            .execute("getProductById");
        if (!product.recordset[0]) {
            res.status(400).json({
                message: `Product with ${id} does not exits`,
            });
        }
        res.status(200).json({
            message: "Success",
            data: product.recordset,
        });
    }
    catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
});
exports.getProductById = getProductById;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        let pool = yield mssql_1.default.connect(config_1.default);
        const { name, imageUrl, price, quantity } = req.body;
        if (!name || !imageUrl || !price || !quantity) {
            return res.status(400).json({
                message: "Please fill in all the details to continue",
            });
        }
        const product = yield pool
            .request()
            .input("id", mssql_1.default.VarChar, id)
            .execute("getProductById");
        if (!product.recordset[0]) {
            return res.status(400).json({
                message: `No Product with that ${id}`,
            });
        }
        yield pool
            .request()
            .input("id", mssql_1.default.VarChar, product.recordset[0].id)
            .input("name", mssql_1.default.VarChar, name)
            .input("imageUrl", mssql_1.default.VarChar, imageUrl)
            .input("price", mssql_1.default.VarChar, price)
            .input("quantity", mssql_1.default.VarChar, quantity)
            .execute("updateProduct");
        res.status(200).json({
            message: "Product Update Successfully ",
        });
    }
    catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
});
exports.updateProduct = updateProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        let pool = yield mssql_1.default.connect(config_1.default);
        const product = yield pool
            .request()
            .input("id", mssql_1.default.VarChar, id)
            .execute("getProductById");
        if (!product.recordset[0]) {
            return res.status(400).json({
                message: `Product with ID : ${id} Does Not exist`,
            });
        }
        yield pool
            .request()
            .input("id", mssql_1.default.VarChar, id)
            .execute("deleteProduct");
        res.status(200).json({
            message: "Product Successfully deleted",
        });
    }
    catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
});
exports.deleteProduct = deleteProduct;
