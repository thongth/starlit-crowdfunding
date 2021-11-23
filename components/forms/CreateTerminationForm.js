import { useState } from 'react'
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
  useToast
} from "@chakra-ui/react";

import { CampaignContract } from "../../eth/metamask/Campaign";
import { makeItMillion } from "../../eth/metamask/USDT";

export default function CreateRequestForm(props) {
  const router = useRouter();
  const { address } = router.query;
  const toast = useToast()

  const [ isCreating, setCreating ] = useState(false)
  const schema = yup.object().shape({
    description: yup.string().required()
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
    CampaignContract(address)
      .createTerminationRequest(
        values.description
      )
      .then((result) => {
        console.log("created", result);
        setCreating(true)
        result.wait().then(receipt => {
          console.log(receipt)
          setCreating(false)
          if (receipt.status) {
            router.push(`/campaign/${address}/termination`);
          } else {
            console.log('fail')
          }
        })
      }).catch((err) => {
        toast({
          title: `${err.error?.message || err.message}`,
          position: 'bottom',
          isClosable: true,
          status: 'error'
        })
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack align="start" spacing={4}>
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
        <Button mt={4} isLoading={isSubmitting || isCreating} type="submit">
          Create!
        </Button>
      </VStack>
    </form>
  );
}
