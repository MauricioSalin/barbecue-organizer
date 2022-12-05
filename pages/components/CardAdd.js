import React from "react";

import { AddIcon } from "@chakra-ui/icons";
import {
  Box,
  Text,
  Flex,
  Center,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";

import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
} from "@chakra-ui/react";

import Form from "./Form";

function CardAdd({ onAddEvent }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Center fontWeight="semibold" p="6" maxW="md" bg="white">
      <Flex flexDirection="column" justifyContent="center" alignItems="center">
        <Box>
          <IconButton onClick={onOpen} size="lg" icon={<AddIcon />} />
          <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
            <DrawerOverlay />
            <DrawerContent>
              <DrawerHeader borderBottomWidth="1px">
                Adicionar evento
              </DrawerHeader>
              <DrawerBody>
                <Form onAddEvent={onAddEvent} />
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </Box>
        <Box p="1">
          <Text>Adicionar churras</Text>
        </Box>
      </Flex>
    </Center>
  );
}

export default CardAdd;
