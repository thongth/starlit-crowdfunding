import { useState } from 'react'
import { useRouter } from "next/router";
import { useForm, Controller } from "react-hook-form";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Textarea,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Button,
  VStack,
  useToast,
  Text
} from "@chakra-ui/react";
import { useEffect, useMemo } from "react";

import { FactoryContract } from "../../eth/metamask/Campaign";

export default function CreateCampaignForm() {
  const [isCreating, setCreating] = useState(false)
  const {
    control,
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({
    name: "",
    description: "",
    threshold: 30,
  });

  const router = useRouter();
  const toast = useToast()
  useEffect(() => {
    register("threshold");
  }, []);

  const onSubmit = (values) => {
    console.log(values);
    FactoryContract()
      .createCampaign(values.name, values.description, 10, values.threshold)
      .then((result) => {
        console.log("created", result);
        setCreating(true)
        result.wait().then(receipt => {
          console.log(receipt)
          setCreating(false)
          if (receipt.status) {
            router.push(`/`);
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

  const thresholdLimit = useMemo(() => 30);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack align="start" spacing={4}>
        {/* Name */}
        <FormControl isInvalid={errors.name}>
          <FormLabel htmlFor="campaign-name">Campaign Name</FormLabel>
          <Input
            id="campaign-name"
            placeholder="Neo Facebook - a free-tracker social media"
            autoComplete="off"
            {...register("name", {
              required: "This field is required",
            })}
          />
          <FormErrorMessage>
            {errors.name && errors.name.message}
          </FormErrorMessage>
        </FormControl>

        {/* Description */}
        <FormControl isInvalid={errors.description}>
          <FormLabel htmlFor="campaign-description">
            Campaign Description
          </FormLabel>
          <Textarea
            id="campaign-description"
            placeholder="..."
            autoComplete="off"
            {...register("description")}
          />
          <FormErrorMessage>
            {errors.description && errors.description.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors?.threshold}>
          <FormLabel htmlFor="campaign-threshold">
            Vote Passed Threshold
          </FormLabel>
          <Controller
            control={control}
            rules={{
              min: {
                value: thresholdLimit,
                message: `Threshold must greater than or equal ${thresholdLimit}%`,
              },
            }}
            name="threshold"
            defaultValue={50}
            render={({ field }) => (
              <>
              <Slider
                aria-label="campaign-threshold"
                id="campaign-threshold"
                min={0}
                max={100}
                {...field}
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb boxSize={6}>{field.value}</SliderThumb>
              </Slider>
                <Text>{`${field.value}%`}</Text>
                </>
            )}
          ></Controller>
          <FormErrorMessage>{errors?.threshold?.message}</FormErrorMessage>
        </FormControl>

        <Button mt={4} isLoading={isSubmitting || isCreating} type="submit">
          Create!
        </Button>
      </VStack>
    </form>
  );
}
