import { Tr, Td, Button, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

import { CampaignContract } from "../eth/metamask/Campaign"

const RequestItem = ({ req }) => {
  const router = useRouter();
  const { address } = router.query;
  const color = req.completed ? "gray.300" : "gray.200";

  const onApprove = () => {
    CampaignContract(address).approveRequest(req.id).then(result => {
      console.log(result)
    })
  }

  const onFinalize = () => {
    CampaignContract(address).finalizeRequest(req.id).then(result => {
      console.log(result)
    })
  }

  return (
    <Tr key={req.id}>
      <Td>
        <Text color={color}>{req.id}</Text>
      </Td>
      <Td>
        <Text color={color}>{req.description}</Text>
      </Td>
      <Td>
        <Text color={color}>{req.amount}</Text>
      </Td>
      <Td>
        <Text color={color}>{req.recipient}</Text>
      </Td>
      <Td>
        <Text color={color}>{req.approval}</Text>
      </Td>
      <Td>
        <Text color={color}>{req.exp}</Text>
      </Td>
      <Td>
        <Button disabled={req.approved} colorScheme="teal" variant="outline" onClick={onApprove}>
          Approve
        </Button>
      </Td>
      <Td>
        <Button disabled={req.completed} colorScheme="blue" variant="outline" onClick={onFinalize}>
          Finalize
        </Button>
      </Td>
    </Tr>
  );
};

export default RequestItem;
