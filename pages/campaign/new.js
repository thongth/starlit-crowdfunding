import { useForm } from "react-hook-form";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
} from "@chakra-ui/react";

export default function CreateCampaignForm(props) {
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
      <FormControl isInvalid={errors.name}>
        <FormLabel htmlFor="campaign-name">Campaign Name</FormLabel>
        <Input
          id="campaign-name"
          placeholder="Neo Facebook - a free-tracker social media"
          autocomplete="off"
          {...register("name", {
            required: "This field is required",
          })}
        />
        <FormErrorMessage>
          {errors.name && errors.name.message}
        </FormErrorMessage>
      </FormControl>
      <Button isLoading={isSubmitting} type="submit">
        Submit
      </Button>
    </form>
  );
}
