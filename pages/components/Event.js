import React from "react";

import {
  Box,
  Text,
  Flex,
  Icon,
  Stack,
  Switch,
  Divider,
  useDisclosure,
} from "@chakra-ui/react";

import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
} from "@chakra-ui/react";

import { MdPerson, MdAttachMoney, MdWest, MdOutlineAdd } from "react-icons/md";

import FormParticipant from "./FormParticipant";

function EventCard({
  item,
  isMobile,
  onCloseEvent,
  onAddParticipant,
  onChangeParticipant,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const amountPeople = (item.participants && item.participants.length) || 0;

  return (
    <div className="event-card">
      <Box paddingX="20px" paddingBottom="20px" bg="white">
        <Flex flexDirection="column" justifyContent="flex-start">
          <Box paddingY="20px">
            <Flex
              flexDirection="row"
              justifyContent="space-between"
              alignItems="flex-start"
            >
              <Box>
                <Flex
                  flexDirection="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Icon
                    cursor="pointer"
                    onClick={onCloseEvent}
                    boxSize="1.2em"
                    as={MdWest}
                  />
                </Flex>
              </Box>
              <Flex
                flexDirection="row"
                justifyContent="center"
                alignItems="center"
              >
                <Flex
                  flexDirection="row"
                  justifyContent="center"
                  alignItems="center"
                  paddingRight="20px"
                >
                  <Icon boxSize="1.2em" as={MdPerson} />
                  <Text>{amountPeople}</Text>
                </Flex>
                <Flex
                  flexDirection="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Icon boxSize="1.2em" as={MdAttachMoney} />
                  <Text>{item.totalPrice}</Text>
                </Flex>
              </Flex>
            </Flex>
          </Box>

          <Flex
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Text fontWeight="semibold" fontSize="lg">
              {item.name}
            </Text>
            <Icon
              onClick={onOpen}
              cursor="pointer"
              boxSize="1.5em"
              as={MdOutlineAdd}
            />

            <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
              <DrawerOverlay />
              <DrawerContent>
                <DrawerHeader borderBottomWidth="1px">
                  Adicionar participante
                </DrawerHeader>
                <DrawerBody>
                  <FormParticipant
                    item={item}
                    onAddParticipant={onAddParticipant}
                  />
                </DrawerBody>
              </DrawerContent>
            </Drawer>
          </Flex>

          <Divider />

          <Stack paddingTop="20px" direction="column">
            {item.participants &&
              item.participants.map((participant, index) => (
                <Flex key={index} flexDirection="row" justifyContent="space-between">
                  <Box>
                    <Flex flexDirection="row">
                      <Box paddingRight="10px">
                        <Switch
                          colorScheme="green"
                          size="sm"
                          isChecked={participant.isPaid}
                          onChange={() =>
                            onChangeParticipant(item, participant)
                          }
                        />
                      </Box>
                      <Text>{participant.name}</Text>
                    </Flex>
                  </Box>
                  <Box>
                    <Flex
                      flexDirection="row"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Icon boxSize="1.2em" as={MdAttachMoney} />
                      <Text>{(item.totalPrice / amountPeople).toFixed(2)}</Text>
                    </Flex>
                  </Box>
                </Flex>
              ))}
          </Stack>
        </Flex>
      </Box>

      <style jsx>{`
        .event-card {
          min-width: ${isMobile ? "100%" : "700px"};
          margin-top: -50px;
        }
      `}</style>
    </div>
  );
}

export default EventCard;
