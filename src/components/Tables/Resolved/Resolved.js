import React, { useEffect, useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

// import { dummyReminders } from '@/data/data';

import styles from "./styles.module.css";

const Resolved = ({data}) => {
    const [reminders, setReminders] = useState([...data]);

    const columnNames = ["No", "Registration", "Created At", "Expires on", "Status"]

    const rows = reminders.filter(reminder => reminder.status === "Resolved").map((reminder, index) => {
        return {
            id: index + 1,
            col1: index + 1,
            col2: reminder.registration,
            col3: reminder.createdAt,
            col4: reminder.expiresAt,
            col5: reminder.status
        }
    });

    const columns = columnNames.map((columnName, index) => {
        return {
            field: `col${index + 1}`,
            headerName: columnName,
            headerClassName: "header_class_style",
            width: index === 0 ? 50 : 150
        }
    })
    // useEffect(() => {
    //     setReminders()
    // })
    return (
        <section className={styles.container}>
            <h3 className={styles.section_title}>Resolved Reminders</h3>
            <DataGrid style={{outline: "none", border: "none"}} rows={rows} columns={columns} components={{ Toolbar: GridToolbar }} />
        </section>
    )
}

export default Resolved;