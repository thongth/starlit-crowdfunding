import {
  Box,
  Text,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputAddon,
  InputRightAddon,
  FormErrorMessage,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

const CampaignSearch = ({ items = [] }) => {
  return (
    <Box my={4}>
      <InputGroup>
        <Input />
        <InputAddon children={<Text>Campaigns</Text>} />
        <InputRightAddon children={<SearchIcon />} />
      </InputGroup>
    </Box>
  );
};

export default CampaignSearch;
