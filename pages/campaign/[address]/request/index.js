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
import ErrorAlert from "../../../../components/alert/ErrorAlert";

import { CampaignContract } from "../../../../eth/metamask/Campaign";
import { divideByMillion } from "../../../../eth/metamask/USDT";

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

  // Table State
  const [query, setQuery] = useState("");
  const [requestList, setRequestList] = useState([]);
  const [filters] = useState({
    recipient: 1,
    description: 1,
  });
  const [result, setResult] = useState([]);
  const [approvalThreshold, setApprovalThreshold] = useState([]);

  const [headerList] = useState(defaultHeaderList);

  // Ether State
  const [, setRequestCount] = useState(0);

  useEffect(() => {
    if (!address) return;
    CampaignContract(address)
      .getRequestsCount()
      .then((result) => {
        const requestCount = result.toNumber();
        setRequestCount(requestCount);
        Promise.all(
          Array(parseInt(requestCount))
            .fill()
            .map((element, index) => {
              return CampaignContract(address).requests(index);
            })
        ).then((requestList) => {
          console.log("request lislt", requestList);
          setRequestList(
            requestList.map((request, idx) => {
              const aRequest = {
                id: idx,
                description: request[0],
                amount: divideByMillion(request[1].toNumber()),
                recipient: request[2],
                exp: new Date(request[5].toNumber()).toLocaleString(),
                approval: divideByMillion(request[4].toNumber()),
                approved: false,
                completed: request[3],
              };
              console.log(aRequest);
              return aRequest;
            })
          );
        });
      });
    CampaignContract(address)
      .getSummary()
      .then((result) => {
        setApprovalThreshold(
          (result[8].toNumber() * result[7].toNumber()) / 100 / 1000000
        );
      });
  }, [address]);

  useEffect(() => {
    if (!query.length) {
      setResult(requestList);
    } else {
      setResult(
        requestList.filter((item) =>
          Object.keys(filters)
            .map((key) => `${item[key]}`.toLowerCase().indexOf(query) >= 0)
            .reduce((prev, cur) => prev || cur)
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
      result.map((req) => (
        <RequestItem
          key={req.id}
          req={req}
          approvalThreshold={approvalThreshold.toString()}
        />
      ))
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
      <ErrorAlert />
      <Flex>
        <NextLink
          href={{ pathname: "/campaign/[address]", query: { address } }}
        >
          <Button>Go back to Campaign</Button>
        </NextLink>
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
      <Table variant="simple" size="sm">
        <TableCaption>Requests of The Campaign</TableCaption>
        <Thead>
          <Tr>{renderTableHeader()}</Tr>
        </Thead>
        <Tbody>{renderTableBody()}</Tbody>
      </Table>
    </>
  );
}
