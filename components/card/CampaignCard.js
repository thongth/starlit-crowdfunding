import NextLink from "next/link";
import { Box, Text, Link } from "@chakra-ui/react";

const CampaignCard = ({ address }, ...props) => {
  return (
    <Box px="2rem" py="1.5rem" borderRadius="md" boxShadow="lg">
      <Text fontSize="xl" fontWeight="bold">
        {address}
      </Text>
      <NextLink href={`campaign/${address}`}>
        <Link fontSize="lg" fontWeight="medium" color="teal.500">
          View Campaign
        </Link>
      </NextLink>
    </Box>
  );
};

export default CampaignCard;
