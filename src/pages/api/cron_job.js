const cron = require("node-cron");
const { MongoClient } = require("mongodb");
import nodemailer from "nodemailer";
import { google } from "googleapis";

const OAuth2 = google.auth.OAuth2;

const OAuth2Client = new OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

OAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

const sendMail = async (body) => {
  try {
    // create transporter
    const { registration, dateDue } = body;
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
    });
    return data;
  } catch (error) {
    return error;
  }
};

export default async function handler(req, res) {
  const body = req.body;
  // scheduling a job
  let task = cron.schedule("0 8 * * *", async () => {
    const client = await MongoClient.connect(process.env.DATABASE_URL, {
      family: 4,
    });

    const remindersCollection = client.db().collection("reminders");
    const remindersArray = await remindersCollection
      .find({ status: "Active" })
      .toArray();

    client.close();
    remindersArray.forEach(async (reminder) => {
      const expiryDate = new Date(reminder.expiresAt);
      const expiryMonth = expiryDate.getMonth();

      const today = new Date(Date.now());
      const thisMonth = today.getMonth();

      // if reminders are due in less than a month
      if (expiryMonth - thisMonth <= 1) {
        // send Email for expiring insurances
        await sendMail({
          registration: reminder.registration,
          dateDue: new Date(reminder.expiresAt),
        });
      }
    });

    console.log("Loading scheduled check from cron-job route");
  });
  task.start();

  res.json({
    status: "Ok",
  });
}
