import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import Navbar from "@/components/Navbar/Navbar";

import store from "@/state/store";

import "@/styles/globals.css";
import MiniDrawer from "@/components/MiniDrawer/MiniDrawer";

export default function App({ Component, pageProps }) {
  const [navShown, setNavShown] = useState(false);

  const { asPath } = useRouter();

  useEffect(() => {
    if (
      asPath === "/" ||
      asPath === "/active" ||
      asPath === "/resolved" ||
      asPath === "all"
    ) {
      setNavShown(true);
    } else {
      setNavShown(false);
    }
  }, [asPath]);
  return (
    <SessionProvider session={pageProps.session}>
      <Provider store={store}>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          {navShown ? <MiniDrawer /> : null}
          <Navbar />
          <Component {...pageProps} />
        </LocalizationProvider>
      </Provider>
    </SessionProvider>
  );
}
