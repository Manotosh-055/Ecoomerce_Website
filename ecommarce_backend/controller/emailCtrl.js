import nodemailer from "nodemailer";
import asyncHandler from "express-async-handler";

const sendEmail = asyncHandler(async (data, req, res) => {

 
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, 
      auth: {
        user: process.env.MAIL_ID, 
        pass: process.env.PASS, 
      },
    });
    
    let info = await transporter.sendMail({
      from: '"Hello 👻" <abcd@gmail.com>',
      to: data.to, 
      subject: data.subject, 
      text: data.text, 
      html: data.htm,
    });
  
});

export default sendEmail;