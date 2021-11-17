import { useRouter } from "next/router";
import { Box } from "@chakra-ui/react";

export default function RequestPage() {
  const router = useRouter();
  const { address } = router.query;

  return <Box>Request : {address}</Box>;
}
