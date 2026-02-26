import { Resend } from "resend";
import { envVars } from "../app/config/env";

export const resendClient = new Resend(envVars.RESEND_API_KEY);

export const sender = {
  email: envVars.EMAIL_FROM,
  name: envVars.EMAIL_FROM_NAME,
};
