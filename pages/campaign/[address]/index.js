import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";

import { useEffect, useState } from "react";

import {
  Box,
  Container,
  Text,
  VisuallyHidden,
  Heading,
  SimpleGrid,
  Flex,
  Button,
  Spacer,
  Grid,
  GridItem,
  useBreakpoint,
} from "@chakra-ui/react";

import ContributeForm from "../../../components/forms/ContributeForm";
import { CampaignContract } from "../../../eth/metamask/Campaign";
import { divideByMillion } from "../../../eth/metamask/USDT";

const InformationBox = ({ title, subtitle, description }) => {
  return (
    <Box p="1rem" boxShadow="md" borderRadius="lg">
      <Heading as="h3" size="lg">
        {title}
      </Heading>
      <Text fontSize="xl" opacity="50%">
        {subtitle}
      </Text>
      <Text>{description}</Text>
    </Box>
  );
};

export default function CampaignPage(props) {
  const router = useRouter();
  const { address } = router.query;
  const [ managerAddress, setManagerAddress ] = useState('')
  const [ minContrib, setMinContrib ] = useState(0)
  const [ campaignBalance, setCampaignBalance ] = useState(0)
  const [ requestNumber, setRequestNumber ] = useState(0)
  const [ contributorNumber, setContributorNumber ] = useState(0)

  const breakpoint = useBreakpoint();

  console.log(breakpoint);

  useEffect(() => {
    console.log('addresss', address)
    console.log(CampaignContract(address))
    CampaignContract(address).getSummary().then(result => {
      setManagerAddress(result[4])
      setMinContrib(divideByMillion(result[0].toNumber()))
      setCampaignBalance(divideByMillion(result[1].toNumber()))
      setRequestNumber(result[2].toNumber())
      setContributorNumber(result[3].toNumber())
    })
  }, []);

  return (
    <>
      <Head>
        <title>Starlit Crowdfunding | campaign dashboard</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <VisuallyHidden>Campaign Page: {address}</VisuallyHidden>
      <Heading size="md">Campaign Information</Heading>
      <SimpleGrid columns={[3, null, 5]} spacing={8}>
        <GridItem colSpan={3}>
          <SimpleGrid columns={[1, null, 1, 2]} spacing="4">
            <InformationBox
              title={managerAddress}
              subtitle="Address of Manager"
              description="Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat."
            />
            <InformationBox
              title={minContrib}
              subtitle="Minimum Contribution (USDT)"
              description="Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat."
            />
            <InformationBox
              title={requestNumber}
              subtitle="Number of Requests"
              description="Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat."
            />
            <InformationBox
              title={contributorNumber}
              subtitle="Number of Contributors"
              description="Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat."
            />
            <InformationBox
              title={campaignBalance}
              subtitle="Balance (USDT)"
              description="Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat."
            />
          </SimpleGrid>
          <NextLink href={`${address}/request`}>
            <Button mt={4}>View Request</Button>
          </NextLink>
        </GridItem>
        <GridItem colSpan={["sm"].includes(breakpoint) ? 3 : 2}>
          <ContributeForm contractAddress={address}/>
        </GridItem>
      </SimpleGrid>
    </>
  );
}
