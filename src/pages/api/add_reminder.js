import addCronJob from "@/globalFunctions/addCronJob";
import { MongoClient } from "mongodb";

export default async function handler (req, res) {
    try {
        const client = await MongoClient.connect(process.env.DATABASE_URL, {
            family: 4
        });
        const db = client.db();

        const remindersCollection = db.collection("reminders");

        const response = await remindersCollection.insertOne({...req.body, createdAt: new Date(Date.now()), status:"Active"});

        client.close();

        addCronJob()
        res.status(201).json({
            message: "Created",
            response
        });
    } catch (error) {
        res.send(error);
    }
}