import { SessionProvider } from "next-auth/react";
import "../styles/index.scss";

//Redux
import { Provider } from "react-redux";
import store from "../redux/store";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </SessionProvider>
  );
}

export default MyApp;
