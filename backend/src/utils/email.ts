import nodemailer from "nodemailer";

interface emailResetOptions {
  email: string;
  subject: string;
  message: string;
}

export const sendEmail = async function (options: emailResetOptions) {
  // Create an email transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      password: process.env.EMAIL_PASSWORD,
    },
  });

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
