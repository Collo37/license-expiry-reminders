import React, { useState, useEffect } from "react";
import Head from "next/head";
import { signIn, useSession } from "next-auth/react";

import styles from "./SignIn.module.css";
import { Button, TextField } from "@mui/material";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const session = useSession();

  const handleSubmit = async (event, email, password) => {
    event.preventDefault();

    const res = await signIn("credentials", {
      email,
      password,
    });
  };

  if (session.status === "authenticated") window.location.replace("/");

  return (
    <>
      <Head>
        <title>Sign in</title>
      </Head>
      <div className={styles.container}>
        <h3 className={styles.heading}>
          {session.status === "loading" ? "Authenticating" : "Welcome"}
        </h3>
        <form
          className={styles.form_container}
          onSubmit={(event) => handleSubmit(event, email, password)}
        >
          <TextField
            label="Email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <TextField
            label="Pasword"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          {/* <button className={styles.login_button} onSubmit={(event) => handleSubmit(event, email, password)}>Login</button> */}
          <Button
            variant="outlined"
            type="submit"
            onSubmit={(event) => handleSubmit(event, email, password)}
          >
            Login
          </Button>
        </form>
      </div>
    </>
  );
};

export default SignIn;
