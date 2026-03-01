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
exports.updateProfile = exports.logout = exports.login = exports.signup = void 0;
const User_1 = __importDefault(require("../models/User"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const utils_1 = require("../../lib/utils");
const emailHandler_1 = require("../utils/emailHandler");
const env_1 = require("../config/env");
const cloudinary_1 = __importDefault(require("../../lib/cloudinary"));
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fullName, email, password } = req.body;
    try {
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        if (password.length < 6) {
            return res
                .status(400)
                .json({ message: "Password must be at least 6 characters" });
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }
        const user = yield User_1.default.findOne({ email });
        if (user)
            return res.status(400).json({ message: "Email already exists" });
        const salt = yield bcryptjs_1.default.genSalt(10);
        const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
        const newUser = new User_1.default({
            fullName,
            email,
            password: hashedPassword,
        });
        if (newUser) {
            const savedUser = yield newUser.save();
            (0, utils_1.generateToken)(savedUser._id, res);
            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic,
            });
            try {
                yield (0, emailHandler_1.sendWelcomeEmail)(savedUser.email, savedUser.fullName, env_1.envVars.CLIENT_URL);
            }
            catch (error) {
                console.error("Failed to send welcome email:", error);
            }
        }
        else {
            res.status(400).json({ message: "Invalid user data" });
        }
    }
    catch (error) {
        console.log("Error in signup controller:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.signup = signup;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }
    try {
        const user = yield User_1.default.findOne({ email });
        if (!user)
            return res.status(400).json({ message: "Invalid credentials" });
        const isPasswordCorrect = yield bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordCorrect)
            return res.status(400).json({ message: "Invalid credentials" });
        (0, utils_1.generateToken)(user._id, res);
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic,
        });
    }
    catch (error) {
        console.error("Error in login controller:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.login = login;
const logout = (req, res) => {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
};
exports.logout = logout;
const updateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { profilePic } = req.body;
        if (!profilePic)
            return res.status(400).json({ message: "Profile pic is required" });
        const userId = req.user._id;
        const uploadResponse = yield cloudinary_1.default.uploader.upload(profilePic);
        const updatedUser = yield User_1.default.findByIdAndUpdate(userId, { profilePic: uploadResponse.secure_url }, { new: true });
        res.status(200).json(updatedUser);
    }
    catch (error) {
        console.log("Error in update profile:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.updateProfile = updateProfile;
