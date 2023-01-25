import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import Navbar from "@/components/Navbar/Navbar";

import store from "@/state/store";

import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  const [showNav, setShowNav] = useState(false);

  const { asPath } = useRouter();

  useEffect(() => {
    console.log(asPath)
    if (asPath === "/auth/signin") {
      setShowNav(false);
    } else {
      setShowNav(true);
    }
  
  }, [asPath])
  return (
    <SessionProvider session={pageProps.session}>
      <Provider store={store}>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          {showNav ? <Navbar /> : null}
          <Component {...pageProps} />
        </LocalizationProvider>
      </Provider>
    </SessionProvider>
  );
}
