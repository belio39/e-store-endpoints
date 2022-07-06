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
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const ejs_1 = __importDefault(require("ejs"));
const Email_1 = __importDefault(require("../helper/Email"));
const emailService = (email) => __awaiter(void 0, void 0, void 0, function* () {
    console.log({ email });
    console.log("running a task every 3 seconds");
    ejs_1.default.renderFile("./template/registration.ejs", { name: "Dennis" }, (error, data) => __awaiter(void 0, void 0, void 0, function* () {
        const mailoptions = {
            from: process.env.EMAIL,
            to: email,
            subject: "Test Sending Email",
            text: "Hello from Server Side!",
            html: data,
        };
        try {
            yield (0, Email_1.default)(mailoptions);
            console.log("Successs");
        }
        catch (error) {
            console.log(error);
        }
    }));
});
exports.default = emailService;
