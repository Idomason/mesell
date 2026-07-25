import { getEnv } from "@/lib/env";
import nodemailer from "nodemailer";
import type { TransportOptions } from "nodemailer";

const env = getEnv();
interface emailResetOptions {
  email: string;
  subject: string;
  message: string;
}

export const sendEmail = async function (options: emailResetOptions) {
  // Create an email transporter
  const transporter = nodemailer.createTransport({
    host: env.EMAIL_HOST,
    port: env.EMAIL_PORT,
    auth: {
      user: env.EMAIL_USERNAME,
      password: env.EMAIL_PASSWORD,
    },
  } as TransportOptions);

  // Define email options
  const mailOptions = {
    from: "Ene Odoba <ene.odoba@yahoo.com>",
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  // Send the email
  await transporter.sendMail(mailOptions);
};

export const sendGuestUserClaimEmail = async function (
  options: emailResetOptions,
) {
  // Transporter
  const transporter = nodemailer.createTransport({
    host: env.EMAIL_HOST,
    port: env.EMAIL_PORT,
    auth: {
      user: env.EMAIL_USERNAME,
      pass: env.EMAIL_PASSWORD,
    },
  } as TransportOptions);

  // Guest mail options
  const mailOptions = {
    email: options.email,
    subject: options.subject,
    text: options.message,
  };

  // Send guest email
  await transporter.sendMail(mailOptions);
};
