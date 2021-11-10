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
  Box,
} from "@chakra-ui/react";

export default function CreateCampaignForm(props) {
  const {
    control,
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = (values) => {
    console.log(values);
  };

  // To Fill
  // - Name
  // - Description
  // - Threshold
  // - Time limit
  // To Fetch
  // - User address

  console.log(props?.name);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
      <FormControl isInvalid={errors.name}>
        <FormLabel htmlFor="campaign-description">
          Campaign Description
        </FormLabel>
        <Textarea
          id="campaign-description"
          placeholder="..."
          autoComplete="off"
          {...register("description", {})}
        />
        <FormErrorMessage>
          {errors.name && errors.name.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="campaign-threshold">
          Vote Passed Threshold
        </FormLabel>
        <Controller
          control={control}
          name="threshold"
          defaultValue={50}
          render={({ field: { value, onChange } }) => {
            return (
              <Slider
                aria-label="campaign-threshold"
                id="campaign-threshold"
                value={value}
                min={30}
                max={100}
                onChange={onChange}
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb boxSize={6}>{value}</SliderThumb>
              </Slider>
            );
          }}
        ></Controller>
      </FormControl>

      <Button isLoading={isSubmitting} type="submit">
        Submit
      </Button>
    </form>
  );
}
