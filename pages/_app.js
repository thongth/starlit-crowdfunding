import { ChakraProvider } from "@chakra-ui/react";
import "../styles/globals.css";

import Banner from "../components/layout/Banner";
import AppContainer from "../components/layout/AppContainer";
import { ErrorProvider } from "../context/error-context";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Banner />
      <ErrorProvider>
        <AppContainer>
          <Component {...pageProps} />
        </AppContainer>
      </ErrorProvider>
    </ChakraProvider>
  );
}

export default MyApp;
