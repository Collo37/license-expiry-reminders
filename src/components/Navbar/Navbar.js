import React from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import { hideNav } from "@/state/mobileNavSlice";

import styles from "./Navbar.module.css";
import { Button } from "@mui/material";
import { AiFillDashboard } from "react-icons/ai";
import { FaGlobe, FaHandHolding, FaSuperpowers } from "react-icons/fa";
import { CalendarPicker } from "@mui/x-date-pickers";

const Navbar = () => {
  const routes = [
    { route: "Dashboard", icon: <AiFillDashboard /> },
    { route: "Active", icon: <FaSuperpowers /> },
    { route: "Resolved", icon: <FaHandHolding /> },
    { route: "All", icon: <FaGlobe /> },
  ];
  const { showNav } = useSelector((state) => state.showNav);
  const router = useRouter();
  const dispatch = useDispatch();

  return (
    <div
      className={styles.container}
      style={showNav ? { display: "flex" } : { display: "none" }}
    >
      <Button
        className={styles.close_button}
        variant="outlined"
        onClick={() => dispatch(hideNav())}
      >
        Close
      </Button>
      <CalendarPicker onChange={() => console.log("clicked")} />
      <div className={styles.calendar_container}>
        {routes.map((route, index) => {
          return (
            <Button
              variant="outlined"
              sx={{ width: 150 }}
              className={styles.button}
              title={route.route}
              style={{ height: 50, marginTop: 10, textAlign: "left" }}
              endIcon={route.icon}
              key={index}
              onClick={() => {
                router.push(
                  route.route === "Dashboard"
                    ? "/"
                    : `/${route.route.toLowerCase()}`
                );
                dispatch(hideNav());
              }}
            >
              {route.route}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default Navbar;
