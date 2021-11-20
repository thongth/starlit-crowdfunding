import { Tr, Td, Button, Text } from "@chakra-ui/react";

const RequestItem = ({ req }) => {
  const color = req.completed ? "gray.300" : "black";

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
        <Button disabled={req.approved} colorScheme="teal" variant="outline">
          Approve
        </Button>
      </Td>
      <Td>
        <Button disabled={req.completed} colorScheme="blue" variant="outline">
          Finalize
        </Button>
      </Td>
    </Tr>
  );
};

export default RequestItem;
