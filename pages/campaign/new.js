import Head from "next/head";
import { Heading, Flex, Box, Spacer } from "@chakra-ui/react";

import CreateCampaignForm from "../../components/forms/CreateCampaignForm";

export default function NewCampaignPage() {
  return (
    <>
      <Head>
        <title>Starlit Crowdfunding | new</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Heading as="h1" mb={4}>
        Create New Campaign
      </Heading>

      <Flex justifyContent="center">
        <Box flex={1}>
          <CreateCampaignForm />
        </Box>
        <Spacer></Spacer>
      </Flex>
    </>
  );
}
