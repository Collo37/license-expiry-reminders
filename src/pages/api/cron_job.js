const cron = require("node-cron");
const { MongoClient } = require("mongodb");

export default async function handler(req, res) {
  const body = req.body;
  // scheduling a job
  let task = cron.schedule("30 * * * * *", async () => {
    const client = await MongoClient.connect(process.env.DATABASE_URL, {
      family: 4,
    });

    const remindersCollection = client.db().collection("reminders");
    const remindersArray = await remindersCollection.find({status: "Active"}).toArray();

    client.close();
    remindersArray.forEach((reminder) => {
      const expiryDate = new Date(reminder.expiresAt);
      const expiryMonth = expiryDate.getMonth();

      const today = new Date(Date.now());
      const thisMonth = today.getMonth();

      // if reminders are due in less than a month
      if (expiryMonth - thisMonth <= 1) {
        // send Email for expiring insurances
        fetch("http://localhost:3000/api/send_mail", {
          method: "POST",
          body: JSON.stringify({
            registration: reminder.registration,
            dateDue: expiryDate,
          }),
        }).then((res) => {
          console.log(res);
        });
      }
    });
    console.log("Loading scheduled check from cron-job route");
  });

  res.json({
    status: "Ok",
  });
}
