import {useState} from 'react'
import { useRouter } from "next/router";
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

import { makeItMillion, USDTContract } from '../../eth/metamask/USDT';
import { CampaignContract } from '../../eth/metamask/Campaign';

const ContributeForm = ({ contractAddress }) => {
  const [isApproved, setApproved] = useState(false)
  const [isApproving, setApproving] = useState(false)
  const [isContributing, setContributing] = useState(false)
  const router = useRouter()
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = (values) => {
    console.log(values);
    if (!isApproved) {
      console.log('usdt contract', USDTContract().address)
      USDTContract().approve(contractAddress, makeItMillion(values.amount)).then((result) => {
        console.log("approved", result);
        setApproving(true)
        result.wait().then(receipt => {
          console.log(receipt)
          setApproving(false)
          if (receipt.status) {
            setApproved(true)
          } else {
            console.log('fail')
          }
        })
      })
    } else {
      CampaignContract(contractAddress).contribute(makeItMillion(values.amount)).then((result) => {
        console.log("contributed", result);
        setContributing(true)
        result.wait().then(receipt => {
          console.log(receipt)
          setContributing(false)
          if (receipt.status) {
            router.reload()
          } else {
            console.log('fail')
          }
        })
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
          <Button type="submit" isLoading={isSubmitting | isApproving | isContributing} mt={4}>
            {isApproved ? 'Contrubute!' : 'Approve USDT'}
          </Button>
      </VStack>
    </form>
  );
};

export default ContributeForm;
