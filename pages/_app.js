import { ChakraProvider } from "@chakra-ui/react";
import "../styles/globals.css";

import Banner from "../components/layout/Banner";
import AppContainer from "../components/layout/AppContainer";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Banner />
      <AppContainer>
        <Component {...pageProps} />
      </AppContainer>
    </ChakraProvider>
  );
}

export default MyApp;
