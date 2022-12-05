import React from "react";

import { useEffect } from "react";
import { useForm } from "react-hook-form";

import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Box,
} from "@chakra-ui/react";

export default function HookForm({ item, onAddParticipant }) {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = (values) => {
    onAddParticipant(item._id, values);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={errors.name}>
        <Box p="3">
          <FormLabel htmlFor="name">Nome do participante</FormLabel>
          <Input
            id="name"
            placeholder="Ex: Maurício"
            {...register("name", {
              required: "This is required",
            })}
          />
        </Box>

        <FormErrorMessage>
          {errors.name && errors.name.message}
        </FormErrorMessage>
      </FormControl>

      <Box p="3">
        <Button
          mt={4}
          colorScheme="teal"
          isLoading={isSubmitting}
          type="submit"
        >
          Adicionar
        </Button>
      </Box>
    </form>
  );
}
