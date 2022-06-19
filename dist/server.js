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
const express_1 = __importDefault(require("express"));
const mssql_1 = __importDefault(require("mssql"));
const dotenv_1 = __importDefault(require("dotenv"));
const config_1 = __importDefault(require("./config/config"));
const user_routes_1 = __importDefault(require("./routes/user-routes"));
const products_routes_1 = __importDefault(require("./routes/products-routes"));
const order_routes_1 = __importDefault(require("./routes/order-routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/users", user_routes_1.default);
app.use("/products", products_routes_1.default);
app.use("/orders", order_routes_1.default);
const connection = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const conn = yield mssql_1.default.connect(config_1.default);
        if (conn.connected) {
            console.log("Connected to DB");
        }
    }
    catch (error) {
        console.log(error.message);
    }
});
connection();
const port = process.env.Port || 3000;
app.listen(port, () => {
    console.log(`App listening to ${port}`);
});
