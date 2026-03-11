import nodemailer from "nodemailer";
import { asyncHandler } from "../error/error.js";

// Create a test account or replace with real credentials.
const sendEmail= asyncHandler(async({to='' , cc='' , bcc='', subject='E-commerce app' , text='' , html='' , attachments=[]}={})=>{
    const transporter = nodemailer.createTransport({
    service:'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
  tls:{
    rejectUnauthorized:false
  }
});

// Wrap in an async IIFE so we can use await.
(async () => {
  const info = await transporter.sendMail({
    from: `"Hana mohsen" <${process.env.EMAIL}>`,
    to,
    cc,
    bcc,
    subject,
    text,
    html,
    attachments
  });
  return info
})();
})

export default sendEmail