import { TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";

import { hideModal } from '@/state/modalSlice';

import styles from "./styles.module.css";
import addReminder from '@/globalFunctions/addReminder';

const NewReminder = () => {
    const { visible } = useSelector(state => state.showModal)
    const dispatch = useDispatch();
    const [reminder, setReminder] = useState({
        registration: "",
        expiresAt: "",
    });

    const handleSubmit = async (event) => {
        event.preventDefault();

        addReminder(reminder);
    };

    return (
        <div className={`${styles.container} ${!visible && `${styles.hidden}`}`}>
            <form className={styles.form_container} onSubmit={handleSubmit}>
                <span className={styles.close_button} onClick={() => dispatch(hideModal())}>&times;</span>
                <h4 className={styles.form_title}>Add New Reminder</h4>
                <TextField
                    id="registration"
                    label="Registration No"
                    type="text"
                    sx={{ width: 220 }}
                    value={reminder.registration}
                    style={{ marginTop: 20 }}
                    onChange={(event) => setReminder({ ...reminder, registration: event.target.value })}
                />
                <TextField
                    id="expiry"
                    label="Expiry"
                    type="date"
                    sx={{ width: 220 }}
                    value={reminder.expiresAt}
                    style={{ marginTop: 20 }}
                    InputLabelProps={{ shrink: true }}
                    onChange={(event) => setReminder({ ...reminder, expiresAt: event.target.value })}
                />
                <button className={styles.form_button} type="submit" onClick={handleSubmit}>
                    Add Reminder
                </button>
            </form>
        </div>
    )
}

export default NewReminder