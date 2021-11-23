import { useState } from "react";
import { Tr, Td, Button, Text, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";

import { CampaignContract } from "../eth/metamask/Campaign";

const RequestItem = ({ req, approvalThreshold = "" }) => {
  const [isApproving, setApproving] = useState(false);
  const [isFinalizing, setFinalizing] = useState(false);
  const router = useRouter();
  const { address } = router.query;
  const color = req.completed ? "gray.300" : "gray.700";

  const toast = useToast();

  const onApprove = () => {
    CampaignContract(address)
      .approveRequest(req.id)
      .then((result) => {
        console.log("approved", result);
        setApproving(true);
        result.wait().then((receipt) => {
          console.log(receipt);
          setApproving(false);
          if (receipt.status) {
            router.reload();
          } else {
            console.log("fail");
          }
        });
      })
      .catch((err) => {
        toast({
          title: `${err.error?.message || err.message}`,
          position: "bottom",
          isClosable: true,
          status: "error",
        });
      });
  };

  const onFinalize = () => {
    CampaignContract(address)
      .finalizeRequest(req.id)
      .then((result) => {
        console.log("finalized", result);
        setFinalizing(true);
        result.wait().then((receipt) => {
          console.log(receipt);
          setFinalizing(false);
          if (receipt.status) {
            router.reload();
          } else {
            console.log("fail");
          }
        });
      })
      .catch((err) => {
        toast({
          title: `${err.error?.message || err.message}`,
          position: "bottom",
          isClosable: true,
          status: "error",
        });
      });
  };

  return (
    <Tr key={req.id}>
      <Td>
        <Text>{req.id}</Text>
      </Td>
      <Td>
        <Text>{req.description}</Text>
      </Td>
      <Td>
        <Text>{req.amount}</Text>
      </Td>
      <Td>
        <Text isTruncated>{req.recipient}</Text>
      </Td>
      <Td>
        <Text>{`${req.approval}/${approvalThreshold}`}</Text>
      </Td>
      <Td>
        <Text>{req.exp}</Text>
      </Td>
      <Td>
        <Button
          isLoading={isApproving}
          disabled={req.approved || req.completed}
          colorScheme="teal"
          variant="outline"
          onClick={onApprove}
        >
          Approve
        </Button>
      </Td>
      <Td>
        <Button
          isLoading={isFinalizing}
          disabled={req.completed}
          colorScheme="blue"
          variant="outline"
          onClick={onFinalize}
        >
          Finalize
        </Button>
      </Td>
    </Tr>
  );
};

export default RequestItem;
