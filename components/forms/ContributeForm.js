import {useState} from 'react'
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

import { USDTContract } from '../../eth/metamask/USDT';
import { CampaignContract } from '../../eth/metamask/Campaign';

const ContributeForm = ({ contractAddress }) => {
  const [isApproved, setApproved] = useState(false)
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = (values) => {
    console.log(values);
    if (!isApproved) {
      console.log('usdt contract', USDTContract().address)
      USDTContract().approve(contractAddress, values.amount).then(result => {
        console.log(result)
        setApproved(true)
      })
    } else {
      CampaignContract(contractAddress).contribute(values.amount).then(result => {
        console.log(result)
      })
    }
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
            <InputRightAddon children="USDT" />
          </InputGroup>
          <FormErrorMessage>
            {errors.amount && errors.amount.message}
          </FormErrorMessage>
        </FormControl>
          <Button type="submit" isLoading={isSubmitting} mt={4}>
            {isApproved ? 'Contrubute!' : 'Approve USDT'}
          </Button>
      </VStack>
    </form>
  );
};

export default ContributeForm;
