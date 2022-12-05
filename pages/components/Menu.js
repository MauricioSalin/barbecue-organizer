import {
  Icon,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
} from "@chakra-ui/react";

import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
} from "@chakra-ui/react";

import { BsThreeDotsVertical } from "react-icons/bs";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";

import Form from "./Form";

export default function ThreeDots({ item, onRemoveEvent, onUpdateEvent }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Menu>
      <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Atualizar evento</DrawerHeader>
          <DrawerBody>
            <Form onUpdateEvent={onUpdateEvent} item={item} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <MenuButton>
        <Icon boxSize="1.3em" as={BsThreeDotsVertical} color="#423225" />
      </MenuButton>
      <MenuList>
        <MenuItem onClick={onOpen} icon={<EditIcon />}>
          Alterar
        </MenuItem>
        <MenuItem onClick={() => onRemoveEvent(item._id)} icon={<DeleteIcon />}>
          Remover
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
