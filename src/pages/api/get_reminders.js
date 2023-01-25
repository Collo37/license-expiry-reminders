import { MongoClient } from "mongodb";

export default async function handler(req, res) {
    try {
        const client = await MongoClient.connect(process.env.DATABASE_URL, {
            family: 4
        });
        const remindersCollection = client.db().collection("reminders");
        const remindersArray = await remindersCollection.find({}).toArray();

        client.close();

        res.status(203).json({
            status: "Ok",
            reminders: remindersArray.map(reminder => {
                return {
                    registration: reminder.registration,
                    createdAt: reminder.createdAt,
                    _id: reminder._id.toString(),
                    status: reminder.status,
                    expiresAt: reminder.expiresAt
                }
            })
        })

    } catch (error) {
        res.send(error)
    }
}