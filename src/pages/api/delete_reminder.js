import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  try {
    const itemId = req.query.id;
    console.log(itemId);
    const client = await MongoClient.connect(process.env.DATABASE_URL, {
      family: 4,
    });

    const db = client.db();
    const remindersCollection = db.collection("reminders");
    const reminders = await remindersCollection.find().toArray();
    const firstReminder = reminders[0];
    console.log(firstReminder._id.toString())
    // await remindersCollection.findOneAndDelete({_id: itemId});
    await client.close();
    res.status(301).json({
      message: "Deleted",
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      error,
    });
  }
}
