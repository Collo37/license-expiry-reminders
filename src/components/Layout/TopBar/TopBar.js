import React from 'react';
import {useRouter } from "next/router";
import { signOut } from 'next-auth/react';
import { Button } from '@mui/material';

import styles from "./TopBar.module.css";

const TopBar = ({ user }) => {
    const {push} = useRouter();

    const handleSignOut = async () => {
        const data = await signOut({
            redirect: false,
            callbackUrl: "/auth/signin"
        });

        push("/auth/signin");
    };

    return (
        <div className={styles.container}>
            <p className={styles.greeting}>{user?.name}</p>
            <Button onClick={handleSignOut} variant="outlined" style={{height: 50, marginLeft: 10, marginRight: 50}} color="error" >Log Out</Button>
        </div>
    )
}

export default TopBar;