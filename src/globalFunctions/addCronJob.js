import cron from "node-cron";
import { MongoClient } from "mongodb";
import axios from "axios";
import sendMail from "./sendMail";

export default async function addCronJob() {
  // scheduling a job
  let task = cron.schedule("10 18 * * * *", async () => {
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
        // const res = await axios.post(`/api/send_mail`, {
        //   registration: reminder.registration,
        //   dateDue: new Date(reminder.expiresAt)
        // });
        sendMail({
          registration: reminder.registration,
          dateDue: new Date(reminder.expiresAt),
        });
      }
    });

    console.log("Loading scheduled check from cron-job route");
  });
  task.start();
  return;
}
