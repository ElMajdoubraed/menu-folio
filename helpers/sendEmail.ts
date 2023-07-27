import nodemailer from "nodemailer";

const user = process.env.EMAIL_ADDRESS;
const pass = process.env.EMAIL_APP_PASSWORD;

const transporter = nodemailer.createTransport({
  host: "smtp.zoho.com",
  secure: true,
  port: 465,
  auth: { user, pass },
});

async function sendEmail(email: string, subject: string, body: string) {
  const message = {
    to: email,
    from: user,
    subject: subject,
    html: body,
  };
  await transporter.sendMail(message, (err: any, info: any) => {
    if (err) {
      console.error("Error sending email: ", err);
      throw err;
    } else {
      return { success: `Message delivered to ${info.accepted}` };
    }
  });
  return message;
}

export default sendEmail;
