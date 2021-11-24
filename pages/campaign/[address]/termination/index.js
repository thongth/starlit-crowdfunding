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

import TerminationRequestItem from "../../../../components/TerminationRequestItem";
import ErrorAlert from "../../../../components/alert/ErrorAlert";

import { CampaignContract } from "../../../../eth/metamask/Campaign";
import { divideByMillion } from "../../../../eth/metamask/USDT";

import { ErrorContext } from "../../../../context/error-context";

const defaultHeaderList = [
  "ID",
  "Description",
  "Approval",
  "Expire Date",
  "Approve",
  "Claim",
];

export default function RequestPage() {
  const router = useRouter();
  const { address } = router.query;

  // Table State
  const [query, setQuery] = useState("");
  const [requestList, setRequestList] = useState([]);
  const [filters] = useState({
    description: 1,
  });
  const [result, setResult] = useState([]);
  const [approvalThreshold, setApprovalThreshold] = useState([])

  const [headerList] = useState(defaultHeaderList);

  // Ether State
  const [, setRequestCount] = useState(0);

  // Error State
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!address) return;
    CampaignContract(address)
      .getTerminationRequestsCount()
      .then((result) => {
        const requestCount = result.toNumber();
        setRequestCount(requestCount);
        Promise.all(
          Array(parseInt(requestCount))
            .fill()
            .map((element, index) => {
              return CampaignContract(address).terminationRequests(index);
            })
        ).then((requestList) => {
          console.log("request lislt", requestList);
          setRequestList(
            requestList.map((request, idx) => {
              const aRequest = {
                id: idx,
                description: request[0],
                exp: new Date(request[3].toNumber()*1000).toLocaleString(),
                approval: divideByMillion(request[2].toNumber()),
                completed: request[1],
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
        setApprovalThreshold(result[8].toNumber() * 2 / 3 / 1000000)
      });
  }, [address]);

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
      result.map((req) => <TerminationRequestItem key={req.id} req={req} approvalThreshold={approvalThreshold.toString()}/>)
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
      <ErrorContext.Provider value={{ error, setError }}>
        <ErrorAlert />
        <Flex>
        <NextLink
          href={{ pathname: "/campaign/[address]", query: { address } }}
        >
          <Button>Go back to Campaign</Button>
        </NextLink>
          <NextLink href={{ pathname: "termination/new", query: { address } }}>
            <Button colorScheme="teal" ml="auto">
              Request termination <AddIcon ml={2} />
            </Button>
          </NextLink>
        </Flex>
        <Box my={4}>
          <InputGroup>
            <Input
              placeholder="Search by Description..."
              onChange={(e) => setQuery(e.target.value)}
            />
            <InputAddon children={<Text>Terminations</Text>} />
            <InputRightAddon children={<SearchIcon />} />
          </InputGroup>
        </Box>
        {/* Table */}
        <Table variant="simple" size="sm">
          <TableCaption>Termination requests</TableCaption>
          <Thead>
            <Tr>{renderTableHeader()}</Tr>
          </Thead>
          <Tbody>{renderTableBody()}</Tbody>
        </Table>
      </ErrorContext.Provider>
    </>
  );
}
