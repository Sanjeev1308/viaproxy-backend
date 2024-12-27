import nodemailer from 'nodemailer';
import { validateEnv } from '../config/env.config';

export const sendEmail = async (to: string, subject: string, text: string) => {
  try {
    const transporter = nodemailer.createTransport({
      service: validateEnv()?.smtp.service,
      secure: true,
      auth: {
        user: validateEnv()?.smtp.mail,
        pass: validateEnv()?.smtp.password,
      },
    });

    // Verify the connection to the SMTP server
    await transporter.verify();

    const mailOption = {
      from: validateEnv()?.smtp.mail,
      to,
      subject,
      text,
    };
    // Send the email
    const info = await transporter.sendMail(mailOption);
    console.log('Email sent: ' + info.response);
  } catch (error: any) {
    console.error('Error sending email:', error.message);
  }
};
