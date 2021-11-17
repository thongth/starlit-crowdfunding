import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";

import { useEffect } from "react";

import {
  Box,
  Container,
  Text,
  VisuallyHidden,
  Heading,
  SimpleGrid,
  Flex,
  Button,
} from "@chakra-ui/react";

import ContributeForm from "../../../components/forms/ContributeForm";

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

  useEffect(() => {}, []);

  return (
    <>
      <Container maxWidth="container.xl" p={4}>
        <Head>
          <title>Starlit Crowdfunding | campaign dashboard</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <VisuallyHidden>Campaign Page: {address}</VisuallyHidden>
        <Heading size="md">Campaign Information</Heading>
        <Flex
          direction={["column-reverse", null, "row"]}
          justify="space-around"
        >
          <Box flex={3}>
            <SimpleGrid columns={[1, null, 1, 2]} spacing="4">
              <InformationBox
                title="0xQWEYD1236SL372FJDF730DJH0738HDKDFH"
                subtitle="Address of Manager"
                description="Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat."
              />
              <InformationBox
                title="102"
                subtitle="Minimum Contribution (Wei)"
                description="Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat."
              />
              <InformationBox
                title="3"
                subtitle="Number of Requests"
                description="Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat."
              />
              <InformationBox
                title="2"
                subtitle="Number of Approvers"
                description="Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat."
              />
              <InformationBox
                title="0.99999"
                subtitle="Balance (Ether)"
                description="Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat."
              />
            </SimpleGrid>
            <NextLink href={`${address}/request`}>
              <Button mt={4}>View Request</Button>
            </NextLink>
          </Box>
          <Box flex={2}>
            <ContributeForm />
          </Box>
        </Flex>
      </Container>
    </>
  );
}
