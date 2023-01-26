import nodemailer from "nodemailer";
import { google } from "googleapis";

const OAuth2 = google.auth.OAuth2;

const OAuth2Client = new OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

OAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

export default async function sendMail(details) {
  try {
    // create transporter
    const { registration, dateDue } = details;
    console.log("Starting mail function...");

    // send email
    const accessToken = await OAuth2Client.getAccessToken();

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.EMAIL,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken,
      },
    });

    // create mail options
    let mailOptions = {
      from: "cowlduor37@gmail.com",
      to: "cowlduor37@gmail.com",
      subject: `${registration} License Expiry Reminder`,
      text: `The license expiry date for ${registration} is ${dateDue}`,
    };

    // send email
    const result = await transporter.sendMail(mailOptions, (err, data) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log("Email sent");
      transporter.close();
      return data;
    });
  } catch (error) {
    return error
  }
}
