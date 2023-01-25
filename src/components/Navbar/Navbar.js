import React from "react";
import { useRouter } from "next/router";

import styles from "./Navbar.module.css";
import { Button } from "@mui/material";
import { AiFillDashboard } from "react-icons/ai";
import { FaGlobe, FaHandHolding, FaSuperpowers } from "react-icons/fa";

const Navbar = () => {
  const routes = [
    { route: "Dashboard", icon: <AiFillDashboard/> },
    { route: "Active", icon: <FaSuperpowers/> },
    { route: "Resolved", icon: <FaHandHolding/> },
    { route: "All", icon: <FaGlobe/> },
  ];

  const router = useRouter();

  return (
    <div className={styles.container}>
      {routes.map((route, index) => {
        return (
          <Button
            variant="outlined"
            sx={{ width: 150 }}
            title={route.route}
            style={{ height: 50, textAlign: "left" }}
            endIcon={route.icon}
            key={index}
            onClick={() =>
              router.push(
                route.route === "Dashboard" ? "/" : `/${route.route.toLowerCase()}`
              )
            }
          >
            {route.route}
          </Button>
        );
      })}
    </div>
  );
};

export default Navbar;
