import NextLink from "next/link";
import { useRouter } from "next/router";

import routes from "../../routes.js";

import { Center, Heading, Box, Text, VStack } from "@chakra-ui/react";

const Banner = () => {
  const router = useRouter();
  const { pathname } = router;

  return (
    <NextLink href={{ pathname: "/" }}>
      <Center
        cursor="pointer"
        bg="black"
        overflow="hidden"
        height={[32, null, `25vh`]}
      >
        <VStack>
          <Text as="span" fontSize="sm" color="whiteAlpha.700">
            Click here to Home
          </Text>
          <Heading as="h1" size="2xl" color="white">
            Starlit Crowdfunding
          </Heading>
          <Text fontSize="2xl" fontWeight="bold" color="white">
            {routes[pathname]}
          </Text>
        </VStack>
      </Center>
    </NextLink>
  );
};

export default Banner;
