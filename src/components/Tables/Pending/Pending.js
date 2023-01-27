import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

import styles from "./styles.module.css";

const Pending = ({ data }) => {
  const [reminders, setReminders] = useState([...data]);

  const columnNames = [
    "No",
    "Registration",
    "Created At",
    "Expires on",
    "Status",
  ];

  const rows = reminders
    .filter((reminder) => reminder.status === "Active")
    .map((reminder, index) => {
      return {
        id: reminder._id,
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
          minWidth: 300,
        }}
        rows={rows}
        columns={columns}
        components={{ Toolbar: GridToolbar }}
      />
    </section>
  );
};

export default Pending;
