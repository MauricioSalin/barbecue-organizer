import React from "react";

import { useEffect } from "react";
import { useForm } from "react-hook-form";

import {
  Box,
  Input,
  Button,
  FormLabel,
  NumberInput,
  FormControl,
  FormErrorMessage,
  NumberInputField,
} from "@chakra-ui/react";

export default function HookForm({ item, onAddEvent, onUpdateEvent }) {
  const {
    setValue,
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = (values) => {
    if (onUpdateEvent) {
      return onUpdateEvent({ _id: item._id, ...values });
    }

    return onAddEvent(values);
  };

  useEffect(() => {
    if (item) {
      const cntDate = new Date(item.date);
      const strDate = `${cntDate.getFullYear()}-${cntDate.getMonth() + 1}-${
        cntDate.getDate() + 1
      }`;

      setValue("name", item.name);
      setValue("date", strDate);
      setValue("totalPrice", item.totalPrice);
    }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={errors.name}>
        <Box p="3">
          <FormLabel htmlFor="name">Título</FormLabel>
          <Input
            id="name"
            placeholder="Ex: Churras dos guri"
            {...register("name", {
              required: "This is required",
              minLength: { value: 4, message: "Minimum length should be 4" },
            })}
          />
        </Box>

        <Box p="3">
          <FormLabel htmlFor="date">Data</FormLabel>
          <Input
            id="date"
            type="date"
            {...register("date", {
              required: "This is required",
            })}
          />
        </Box>

        <Box p="3">
          <FormLabel htmlFor="totalPrice">Total do churrasco</FormLabel>
          <NumberInput
            {...register("totalPrice", {
              required: "This is required",
            })}
            precision={2}
            onChange={(value) => setValue("totalPrice", parseFloat(value))}
          >
            <NumberInputField name="totalPrice" />
          </NumberInput>
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
          {item ? "Atualizar" : "Adicionar"}
        </Button>
      </Box>
    </form>
  );
}
