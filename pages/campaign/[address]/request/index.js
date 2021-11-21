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
import { CampaignContract } from "../../../../eth/metamask/Campaign"

const defaultHeaderList = [
  "ID",
  "Description",
  "Amount (USDT)",
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
  const [requestCount, setRequestCount] = useState(0)

  useEffect(() => {
    // 1. fetch request list
    CampaignContract(address).getRequestsCount().then(result => {
      const requestCount = result.toNumber()
      setRequestCount(requestCount)
      Promise.all(
        Array(parseInt(requestCount)).fill().map((element, index) => {
            return CampaignContract(address).requests(index)
        })
    ).then(requestList => {
      setRequestList(requestList.map((request, idx) => {
        const request = {
          id: idx,
          description: request[0],
          amount: request[1].toNumber(),
          recipient: request[2],
          exp: new Date(request[5].toNumber()).toLocaleString(),
          approval: request[4].toNumber(),
          approved: false,
          completed: request[3],
        }
        console.log(request)
        return request
      }))
    })
    })
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
          <Text fontSize="lg" textAlign="center" color="white">
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
