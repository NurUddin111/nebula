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
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendWelcomeEmail = void 0;
const resend_1 = require("../../lib/resend");
const welcome_1 = require("./templates/welcome");
const sendWelcomeEmail = (email, name, clientURL) => __awaiter(void 0, void 0, void 0, function* () {
    const { data, error } = yield resend_1.resendClient.emails.send({
        from: `${resend_1.sender.name} <${resend_1.sender.email} >`,
        to: email,
        subject: "Welcome to Nebula",
        html: (0, welcome_1.createWelcomeEmailTemplate)(name, clientURL),
    });
    if (error) {
        console.error("Error sending welcome email:", error);
        throw new Error("Failed to send welcome email");
    }
    console.log("Welcome email sent successfully", data);
});
exports.sendWelcomeEmail = sendWelcomeEmail;
