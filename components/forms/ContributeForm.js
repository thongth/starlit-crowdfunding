import { useForm, Controller } from "react-hook-form";
import {
  VStack,
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  InputGroup,
  InputRightAddon,
  Button,
} from "@chakra-ui/react";

const ContributeForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack alignItems="start" spacing={4}>
        <FormControl isInvalid={errors.amount}>
          <FormLabel htmlFor="contributed-amount">
            Amount to Contribute
          </FormLabel>
          <InputGroup>
            <Input
              type="number"
              id="contributed-amount"
              autoComplete="off"
              {...register("amount", {
                required: "Please fill the amount you want to contribute.",
                valueAsNumber: true,
              })}
            />
            <InputRightAddon children="ether" />
          </InputGroup>
          <FormErrorMessage>
            {errors.amount && errors.amount.message}
          </FormErrorMessage>
        </FormControl>
        <Button type="submit" isLoading={isSubmitting} mt={4}>
          Contrubute!
        </Button>
      </VStack>
    </form>
  );
};

export default ContributeForm;
