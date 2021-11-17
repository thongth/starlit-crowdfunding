import { ChakraProvider } from "@chakra-ui/react";
import "../styles/globals.css";

import Banner from "../components/layout/Banner";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Banner />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
