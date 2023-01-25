import React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

import { MongoClient } from "mongodb";

import styles from "@/styles/Active.module.css";

const Active = ({ data }) => {
  const columnNames = [
    "No",
    "Registration",
    "Created At",
    "Expires on",
    "Status",
  ];

  const rows = data
    .map((reminder, index) => {
      return {
        id: index + 1,
        col1: index + 1,
        col2: reminder.registration,
        col3: reminder.createdAt,
        col4: reminder.expiresAt,
        col5: reminder.status,
      };
    });

  const columns = columnNames.map((columnName, index) => {
    return {
      field: `col${index + 1}`,
      headerName: columnName,
      headerClassName: "header_class_style",
      width: index === 0 ? 50 : 150,
    };
  });

  return (
    <section className={styles.container}>
      <h3 className={styles.section_title}>Active Reminders</h3>
      <DataGrid
        style={{
          borderRadius: 10,
          borderColor: "#1976D2",
          marginBottom: 30,
          fontFamily: "Poppins",
          padding: 10,
        }}
        rows={rows}
        columns={columns}
        components={{ Toolbar: GridToolbar }}
      />
    </section>
  );
};

export const getServerSideProps = async () => {
  const client = await MongoClient.connect(process.env.DATABASE_URL, {
    family: 4,
  });

  const remindersCollection = client.db().collection("reminders");
  const remindersArray = await remindersCollection
    .find({ status: "Active" })
    .toArray();

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
export default Active;
