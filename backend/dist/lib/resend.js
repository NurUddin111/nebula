"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sender = exports.resendClient = void 0;
const resend_1 = require("resend");
const env_1 = require("../app/config/env");
exports.resendClient = new resend_1.Resend(env_1.envVars.RESEND_API_KEY);
exports.sender = {
    email: env_1.envVars.EMAIL_FROM,
    name: env_1.envVars.EMAIL_FROM_NAME,
};
