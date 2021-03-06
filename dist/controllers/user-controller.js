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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassWord = exports.login = exports.deleteUser = exports.getUserById = exports.getAllUsers = exports.createUser = void 0;
const uuid_1 = require("uuid");
const user_schema_1 = require("../models/user-schema");
const mssql_1 = __importDefault(require("mssql"));
const config_1 = __importDefault(require("../config/config"));
const dotenv_1 = __importDefault(require("dotenv"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = (0, uuid_1.v4)();
    // console.log({ req, id });
    try {
        const { fullName, userName, email, password } = req.body;
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        let pool = yield mssql_1.default.connect(config_1.default);
        const { error } = user_schema_1.UserSchema.validate(req.body);
        if (error) {
            return res.json(error.details[0].message);
        }
        else {
            const user = yield pool
                .request()
                .input("id", mssql_1.default.VarChar, id)
                .input("fullName", mssql_1.default.VarChar, fullName)
                .input("userName", mssql_1.default.VarChar, userName)
                .input("email", mssql_1.default.VarChar, email)
                .input("password", mssql_1.default.VarChar, hashedPassword)
                .execute("createusers");
            const queue = yield pool
                .request()
                .input("user_id", mssql_1.default.VarChar, id)
                .input("order_id", mssql_1.default.VarChar, "")
                .input("type", mssql_1.default.VarChar, "REGISTRATION")
                .execute("createQueue");
            res.status(200).json({
                message: "User Created Successfully!",
            });
            console.log({ queue });
        }
    }
    catch (error) {
        res.json({ error: error.message });
    }
});
exports.createUser = createUser;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let pool = yield mssql_1.default.connect(config_1.default);
        const users = yield pool.request().execute("getAllUsers");
        const data = users.recordset.map((record) => {
            const { password } = record, rest = __rest(record, ["password"]);
            return rest;
        });
        res.status(200).json({
            message: "Success",
            data,
        });
    }
    catch (error) {
        console.log({ error });
        res.json({ error: error.message });
    }
});
exports.getAllUsers = getAllUsers;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        let pool = yield mssql_1.default.connect(config_1.default);
        const user = yield pool
            .request()
            .input("id", mssql_1.default.VarChar, id)
            .execute("getUserById");
        if (!user.recordset[0]) {
            return res.json({
                message: `User with ${id} does not exits`,
            });
        }
        res.status(200).json({
            message: "Success",
            data: user.recordset,
        });
    }
    catch (error) {
        res.json({ error: error.message });
    }
});
exports.getUserById = getUserById;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        let pool = yield mssql_1.default.connect(config_1.default);
        const user = yield pool
            .request()
            .input("id", mssql_1.default.VarChar, id)
            .execute("getUserById");
        if (!user.recordset[0]) {
            return res.json({
                message: `No user with ${id} Does Not exist`,
            });
        }
        yield pool.request().input("id", mssql_1.default.VarChar, id).execute("deleteUser");
        res.status(200).json({
            message: "User Successfully deleted",
            data: user.recordset,
        });
    }
    catch (error) {
        res.json({
            error: error.message,
        });
    }
});
exports.deleteUser = deleteUser;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let pool = yield mssql_1.default.connect(config_1.default);
        const { email, password } = req.body;
        // Check if email and password are provided
        if (!email || !password) {
            return res.status(400).json({
                message: "Please provide email and password!",
            });
        }
        const user = yield pool
            .request()
            .input("email", mssql_1.default.VarChar, email)
            .execute("getUserByEmail");
        if (!user.recordset[0]) {
            return res.status(400).json({
                message: `Invalid credentials`,
            });
        }
        const passwordMatch = yield bcrypt_1.default.compare(password, user.recordset[0].password);
        if (!passwordMatch) {
            return res.status(400).json({ message: `Invalid credentials` });
        }
        const _a = user.recordset[0], { password: _ } = _a, details = __rest(_a, ["password"]);
        const token = yield jsonwebtoken_1.default.sign({ id: details.id }, process.env.SECRET_KEY, { expiresIn: "24h" });
        res.json({ message: "Login Successfulll", user: details, token });
    }
    catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
});
exports.login = login;
const resetPassWord = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        let pool = yield mssql_1.default.connect(config_1.default);
        const { password } = req.body;
        const user = yield pool
            .request()
            .input("id", mssql_1.default.VarChar, id)
            .execute("getUserById");
        if (!user.recordset[0]) {
            return res.status(400).json({
                message: `No user with that ID ${id}`,
            });
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        yield pool
            .request()
            .input("id", mssql_1.default.VarChar, id)
            .input("password", mssql_1.default.VarChar, hashedPassword)
            .execute("resetPassWord");
        res.status(200).json({
            messege: "Password reset was successful",
        });
    }
    catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }
});
exports.resetPassWord = resetPassWord;
