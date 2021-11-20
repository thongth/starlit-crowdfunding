import {
  Box,
  Text,
  Input,
  InputGroup,
  InputAddon,
  InputRightAddon,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

const FilterSearch = ({ label, value, onChange }) => {
  return (
    <Box my={4}>
      <InputGroup>
        <Input value={value} onChange={onChange} />
        <InputAddon children={<Text>{label}</Text>} />
        <InputRightAddon children={<SearchIcon />} />
      </InputGroup>
    </Box>
  );
};

export default FilterSearch;
