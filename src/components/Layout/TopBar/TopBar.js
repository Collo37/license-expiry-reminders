import React from "react";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";
import { Button } from "@mui/material";
import { AiOutlineMenu } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";

import { showNav } from "@/state/mobileNavSlice";

import styles from "./TopBar.module.css";

const TopBar = ({ user }) => {
  const { push } = useRouter();
  const dispatch = useDispatch();

  const handleSignOut = async () => {
    const data = await signOut({
      redirect: false,
      callbackUrl: "/auth/signin",
    });

    push("/auth/signin");
  };

  return (
    <div className={styles.container}>
      <p className={styles.greeting}>{user?.name}</p>
      <Button
        onClick={handleSignOut}
        variant="outlined"
        className={styles.button}
        style={{ height: 50, marginLeft: 10 }}
        color="error"
      >
        Log Out
      </Button>
      <Button variant="outlined" className={styles.menu_button} onClick={() => dispatch(showNav())} endIcon={<AiOutlineMenu />}>Menu</Button>
    </div>
  );
};

export default TopBar;
