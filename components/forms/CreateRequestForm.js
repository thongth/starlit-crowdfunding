import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import * as yup from "yup";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  InputGroup,
  InputRightAddon,
  Textarea,
  Button,
  VStack,
} from "@chakra-ui/react";

import { CampaignContract } from '../../eth/metamask/Campaign'
import { makeItMillion } from "../../eth/metamask/USDT";

export default function CreateRequestForm(props) {
  const router = useRouter();
  const { address } = router.query;
  const schema = yup.object().shape({
    amount: yup
      .number()
      .typeError("Amount must be a Number")
      .positive("Amount must be positive")
      .required(),
    description: yup.string().required(),
    recipient: yup.string().required(),
    exp: yup
      .date()
      .typeError("Invalid Date")
      .default(() => new Date()),
  });

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (values) => {
    console.log(values);
    CampaignContract(address).createRequest(values.description, makeItMillion(values.amount), values.recipient, 999888999888999).then(result => {
      console.log('created', result)
    })
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack align="start" spacing={4}>
        {/* Amount */}
        <FormControl isInvalid={errors.amount}>
          <FormLabel htmlFor="amount">Amount</FormLabel>
          <InputGroup>
            <Input
              id="amount"
              type="number"
              autoComplete="off"
              {...register("amount")}
            />
            <InputRightAddon children="ether" />
          </InputGroup>
          <FormErrorMessage>{errors?.amount?.message}</FormErrorMessage>
        </FormControl>

        {/* Description */}
        <FormControl isInvalid={errors.description}>
          <FormLabel htmlFor="description">Description</FormLabel>
          <Textarea
            id="description"
            placeholder="..."
            autoComplete="off"
            {...register("description")}
          />
          <FormErrorMessage>{errors?.description?.message}</FormErrorMessage>
        </FormControl>

        {/* Recipient */}
        <FormControl isInvalid={errors.recipient}>
          <FormLabel htmlFor="recipient">Recipient</FormLabel>
          <Input
            id="recipient"
            placeholder="Address of the Recipient"
            {...register("recipient")}
          />
          <FormErrorMessage>{errors?.recipient?.message}</FormErrorMessage>
        </FormControl>

        {/* EXP Date */}
        <FormControl isInvalid={errors.exp}>
          <FormLabel htmlFor="exp">Description</FormLabel>
          <Input
            id="exp"
            type="datetime-local"
            placeholder="Expired Date of Request"
            autoComplete="off"
            {...register("exp")}
          />
          <FormErrorMessage>{errors?.exp?.message}</FormErrorMessage>
        </FormControl>
        <Button mt={4} isLoading={isSubmitting} type="submit">
          Create!
        </Button>
      </VStack>
    </form>
  );
}
