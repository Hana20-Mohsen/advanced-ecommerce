
// // export default sendEmail
// import nodemailer from "nodemailer";
// import { asyncHandler } from "../error/error.js";

// // Create a test account or replace with real credentials.
// const sendEmail= async({to='' , cc='' , bcc='', subject='E-commerce app' , text='' , html='' , attachments=[]}={})=>{
//   console.log(`enter send EMAIL`);
    
//   const transporter = nodemailer.createTransport({
//     service:'gmail',
//   auth: {
//     user: process.env.EMAIL,
//     pass: process.env.EMAIL_PASSWORD,
//   },
//   tls:{
//     rejectUnauthorized:false
//   }
// });
// // console.log(`transporter : ` , transporter);


// // Wrap in an async IIFE so we can use await.
// (async () => {
//   const info = await transporter.sendMail({
//     from: `"Hana mohsen" <${process.env.EMAIL}>`,
//     to,
//     cc,
//     bcc,
//     subject,
//     text,
//     html,
//     attachments
//   });
//   console.log(`info : ` , info);
  
//   return info
// })();
// }

// export default sendEmail

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async ({
  to = '',
  cc = '',
  bcc = '',
  subject = 'E-commerce app',
  text = '',
  html = '',
  attachments = []
} = {}) => {

  console.log("enter send EMAIL");

  try {
    const response = await resend.emails.send({
      from: `"Hana mohsen" <${process.env.EMAIL}>`,
      to: Array.isArray(to) ? to : [to],
      cc: cc ? (Array.isArray(cc) ? cc : [cc]) : undefined,
      bcc: bcc ? (Array.isArray(bcc) ? bcc : [bcc]) : undefined,
      subject,
      html: html || `<p>${text}</p>`,
      attachments
    });

    console.log("Email sent:", response);

    return response;

  } catch (error) {
    console.log("Resend Error:", error);
    throw error;
  }
};

export default sendEmail;