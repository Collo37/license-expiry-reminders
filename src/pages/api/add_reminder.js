import { MongoClient } from "mongodb";
import nodeCron from "node-cron";

export default async function handler (req, res) {
    try {
        const client = await MongoClient.connect(process.env.DATABASE_URL, {
            family: 4
        });
        const db = client.db();

        const remindersCollection = db.collection("reminders");

        const response = await remindersCollection.insertOne({...req.body, createdAt: new Date(Date.now()), status:"Active"});

        client.close();

        nodeCron.schedule("30 * * * * *", () => {
            console.log("Loading scheduled tasks from add_reminder");
        })
        res.status(201).json({
            message: "Created",
            response
        });
    } catch (error) {
        res.send(error);
    }
}