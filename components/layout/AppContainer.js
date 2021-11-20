import { Container } from "@chakra-ui/react";

const AppContainer = ({ children }) => {
  return (
    <Container maxWidth="container.xl" p={[16]}>
      {children}
    </Container>
  );
};

export default AppContainer;
