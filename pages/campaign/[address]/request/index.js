import NextLink from "next/link";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Flex,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  InputGroup,
  Input,
  InputAddon,
  InputRightAddon,
} from "@chakra-ui/react";
import { AddIcon, SearchIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";

import RequestItem from "../../../../components/RequestItem";

const defaultHeaderList = [
  "ID",
  "Description",
  "Amount (ether)",
  "Recipient",
  "Approval",
  "Expire Date",
  "Approve",
  "Finalize",
];

export default function RequestPage() {
  const router = useRouter();
  const { address } = router.query;
  const [headerList, setHeaderList] = useState(defaultHeaderList);
  const [requestList, setRequestList] = useState([]);

  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({
    description: 1,
  });
  const [result, setResult] = useState([]);

  useEffect(() => {
    // 1. fetch request list
    setTimeout(
      () =>
        setRequestList([
          {
            id: 0,
            description: "This first request",
            amount: 0.001,
            recipient: "0xSDFJHIOWYEKC1238CH385HD",
            exp: new Date().toLocaleString(),
            approval: 3,
            approved: true,
            completed: true,
          },
          {
            id: 1,
            description: "This second request",
            amount: 0.97,
            recipient: "0xEFHCK342347CKEDLCYERSYG",
            exp: new Date().toLocaleString(),
            approval: 2,
            approved: false,
            completed: false,
          },
          {
            id: 2,
            description: "This third request",
            amount: 0.00001,
            recipient: "0xSDFEH983D739F60G6YERSYG",
            exp: new Date().toLocaleString(),
            approval: 2,
            approved: true,
            completed: false,
          },
        ]),
      1000
    );
  }, []);

  useEffect(() => {
    if (!query.length) {
      setResult(requestList);
    } else {
      setResult(
        requestList.filter((item) =>
          Object.keys(filters)
            .map((key) => `${item[key]}`.indexOf(query) >= 0)
            .reduce((prev, cur) => prev && cur)
        )
      );
    }
  }, [query, requestList]);

  const renderTableHeader = () =>
    headerList.map((header) => (
      <Th key={header}>
        <Text fontSize="md" fontWeight="bold">
          {header}
        </Text>
      </Th>
    ));

  const renderTableBody = () =>
    result.length > 0 ? (
      result.map((req) => <RequestItem key={req.id} req={req} />)
    ) : (
      <Tr>
        <Td colSpan={headerList.length}>
          <Text fontSize="lg" textAlign="center">
            No Result
          </Text>
        </Td>
      </Tr>
    );

  return (
    <>
      <Flex>
        <NextLink href={{ pathname: "request/new", query: { address } }}>
          <Button colorScheme="teal" ml="auto">
            Create <AddIcon ml={2} />
          </Button>
        </NextLink>
      </Flex>
      <Box my={4}>
        <InputGroup>
          <Input
            placeholder="Search by Description..."
            onChange={(e) => setQuery(e.target.value)}
          />
          <InputAddon children={<Text>Requests</Text>} />
          <InputRightAddon children={<SearchIcon />} />
        </InputGroup>
      </Box>
      {/* Table */}
      <Table variant="simple">
        <TableCaption>Requests of The Campaign</TableCaption>
        <Thead>
          <Tr>{renderTableHeader()}</Tr>
        </Thead>
        <Tbody>{renderTableBody()}</Tbody>
      </Table>
    </>
  );
}
