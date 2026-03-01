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
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const env_1 = require("../app/config/env");
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("...Connecting to MONGODB");
        const MONGO_URI = env_1.envVars.MONGO_URI;
        if (!MONGO_URI)
            throw new Error("MONGO_URI is not set!");
        const conc = yield mongoose_1.default.connect(MONGO_URI);
        console.log("🗳️  MONGODB CONNECTED:", conc.connection.host);
    }
    catch (error) {
        console.error("Error connecting to MONGODB:", error);
        process.exit(1);
    }
});
exports.connectDB = connectDB;
