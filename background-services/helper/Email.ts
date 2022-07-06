import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const createTransporter = (config: any) => {
  let transporter = nodemailer.createTransport(config);
  return transporter;
};
const configuration = {
  port: 587,
  host: "smtp-mail.outlook.com",
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.EMAIL as string,
    pass: process.env.EMAIL_PASSWORD as string,
  },
};

const sendMail = async (mailoption: any) => {
  const transporter = createTransporter(configuration);
  await transporter.verify();
  await transporter.sendMail(mailoption);
};
export default sendMail;
