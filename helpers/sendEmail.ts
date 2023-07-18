import nodemailer from "nodemailer";

function sendEmail(email: string, link: string, subject: string, body: string) {
  const message = {
    to: email,
    from: process.env.EMAIL_ADDRESS,
    subject: subject,
    html: `<p>${body}</p>`,
  };

  let transporter = nodemailer.createTransport({
    host: "smtp.titan.email",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });

  transporter.sendMail(message, (err: any, info: any) => {
    if (err) {
      return {
        error: `Connection refused at ${err}`,
      };
    } else {
      return { success: `Message delivered to ${info.accepted}` };
    }
  });
}

export default sendEmail;
