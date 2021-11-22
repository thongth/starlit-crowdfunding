import { useContext } from "react";
import {
  ScaleFade,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Box,
  CloseButton,
  Text,
} from "@chakra-ui/react";
import { ErrorContext } from "../../context/error-context";

// use error from context
const ErrorAlert = () => {
  const { error, setError } = useContext(ErrorContext);

  return (
    <ScaleFade initialScale={0.8} in={error}>
      {error && (
        <Alert borderRadius="md" shadow="md" my={4} status="error">
          <AlertIcon w={8} h={8} />
          <Box>
            <AlertTitle>{error?.code}</AlertTitle>
            <AlertDescription display="flex">
              <Text wordBreak="break-all">{error?.message}</Text>
            </AlertDescription>
          </Box>
          <CloseButton
            onClick={() => setError(false)}
            position="absolute"
            right={2}
            top={2}
          />
        </Alert>
      )}
    </ScaleFade>
  );
};

export default ErrorAlert;
