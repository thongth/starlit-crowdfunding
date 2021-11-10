import { useRouter } from "next/router";
import { Box } from "@chakra-ui/react";

export default function RequestPage(props) {
  const router = useRouter();
  const { address } = router.query;

  console.log(address);

  return <Box>Request : {address}</Box>;
}
