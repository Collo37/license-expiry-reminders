import Head from "next/head";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import Layout from "@/components/Layout/Layout";
import NewReminder from "@/components/NewReminder/NewReminder";
import TopBar from "@/components/Layout/TopBar/TopBar";

import styles from "@/styles/Home.module.css";
import { MongoClient } from "mongodb";
import { CalendarPicker } from "@mui/x-date-pickers";

import addCronJob from "@/globalFunctions/addCronJob";

export default function Home({ data }) {
  const [authenticated, setAuthenticated] = useState(false);
  const session = useSession();

  useEffect(() => {
    session?.status === "loading" && setAuthenticated(false);
    session?.status === "authenticated" && setAuthenticated(true);
    session?.status === "unauthenticated" &&
      global.window.location.replace("/auth/signin");
  }, [session]);

  return (
    authenticated && (
      <>
        <Head>
          <title>Insurance Reminders Manager</title>
          <meta
            name="description"
            content="Insurance reminder management app"
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className={styles.container}>
          <main className={styles.main}>
            <Layout user={session?.data?.user} data={data} />
            <NewReminder />
          </main>
          <section className={styles.widget}>
            <h3 className={styles.logo}>{`Insurance${"\n"}Reminder`}</h3>
            <div className={styles.calendar_container}>
              <h3 className={styles.widget_title}>Calendar</h3>
              <CalendarPicker
                onChange={() => {
                  console.log("picked");
                }}
                view="day"
              />
            </div>
            <TopBar user={session?.data?.user} />
          </section>
        </div>
      </>
    )
  );
}

export const getServerSideProps = async () => {
  const client = await MongoClient.connect(process.env.DATABASE_URL, {
    family: 4,
  });

  const remindersCollection = client.db().collection("reminders");
  const remindersArray = await remindersCollection.find().toArray();
  addCronJob();

  client.close();

  return {
    props: {
      data: remindersArray.map((reminder) => {
        return {
          registration: reminder.registration.toString(),
          createdAt: reminder.createdAt.toString(),
          _id: reminder._id.toString(),
          status: reminder.status,
          expiresAt: reminder.expiresAt,
        };
      }),
    },
  };
};
