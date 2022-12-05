import React from "react";

import { Box, Flex, Icon, Text, useDisclosure } from "@chakra-ui/react";
import { MdPerson, MdAttachMoney } from "react-icons/md";

import Menu from "./Menu";

function Card({ item, handleOpenEvent, onRemoveEvent, onUpdateEvent }) {
  const date = new Date(item.date);
  const amountPeople = item.participants.length || 0;

  return (
    <div className="card">
      <Box maxW="md" overflow="hidden" bg="white">
        <div className="card-hero">
          <div className="menu-item">
            <Menu
              item={item}
              onRemoveEvent={onRemoveEvent}
              onUpdateEvent={onUpdateEvent}
            />
          </div>
        </div>

        <Box onClick={() => handleOpenEvent(item)} p="6">
          <Flex justifyContent="space-between">
            <Box mt="1">
              <Text fontSize="2xl" fontWeight="bold">
                {date.getDate() + 1}/{date.getMonth() + 1}
              </Text>
              <Box fontWeight="450"> {item.name}</Box>
            </Box>

            <Flex
              flexDirection="column"
              justifyContent="flex-end"
              alignItems="flex-start"
            >
              <Box>
                <Flex
                  flexDirection="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Icon boxSize="1.2em" as={MdPerson} />
                  <Text>{amountPeople}</Text>
                </Flex>
              </Box>
              <Box>
                <Flex
                  flexDirection="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Icon boxSize="1.2em" as={MdAttachMoney} />
                  <Text>{item.totalPrice}</Text>
                </Flex>
              </Box>
            </Flex>
          </Flex>
        </Box>
      </Box>
      <style jsx>{`
        .card-hero {
          width: 100%;
          height: 100px;
          background: url("https://png.pngtree.com/thumb_back/fw800/back_our/20190620/ourmid/pngtree-gourmet-bbq-skewers-food-stalls-image_165640.jpg")
            no-repeat top;
          background-size: cover;
          position: relative;
        }

        .card {
          cursor: pointer;
        }

        .card:hover {
          box-shadow: 0px 0px 25px -3px rgba(0, 0, 0, 1);
        }

        .menu-item {
          position: absolute;
          display: flex;
          align-items: center;
          justify-content: center;
          padding-top: 4px;
          top: 5px;
          right: 5px;
          border-radius: 30px;
          height: 30px;
          width: 30px;
          background-color: #efefef;
        }

        .menu-item:hover {
          background-color: #efefef85;
        }
      `}</style>
    </div>
  );
}

export default Card;
