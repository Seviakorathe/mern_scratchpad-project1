import { useScratchpadJournal } from "../journal/scratchpad";
import { useState } from "react";
import {
  Box,
  Button,
  Heading,
  HStack,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorModeValue,
  useDisclosure,
  useToast,
  VStack,
  Textarea,
} from "@chakra-ui/react";

const ScratchpadCard = ({ scratchpad }) => {
  const [updatedScratchpad, setUpdatedScratchpad] = useState(scratchpad);

  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");

  const { deleteScratchpad, updateScratchpad } = useScratchpadJournal();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDeleteScratchpad = async (pid) => {
    const { success, message } = await deleteScratchpad(pid);
    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Success",
        description: message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleUpdateScratchpad = async (pid, updatedScratchpad) => {
    const { success, message } = await updateScratchpad(pid, updatedScratchpad);
    onClose();
    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Success",
        description: "Scratchpad updated successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bg={bg}>
      <Image
        src={scratchpad.image}
        alt={scratchpad.name}
        h={48}
        w="full"
        objectFit="cover"
      />

      <Box p={4}>
        <Heading as="h3" size="md" mb={2}>
          {scratchpad.name}
        </Heading>

        <Text fontWeight="bold" fontSize="xl" color={textColor} mb={4}>
          {scratchpad.detail}
        </Text>

        <HStack spacing={2}>
          <Button onClick={onOpen} colorScheme="green">
            Edit
          </Button>
          <Button
            onClick={() => handleDeleteScratchpad(scratchpad._id)}
            colorScheme="red">
            Delete
          </Button>
        </HStack>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>Update Scratchpad</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Input
                placeholder="Scratchpad Name"
                title="title"
                value={updatedScratchpad.name}
                onChange={(e) =>
                  setUpdatedScratchpad({
                    ...updatedScratchpad,
                    name: e.target.value,
                  })
                }
              />
              <Input
                placeholder="Image URL"
                name="image"
                value={updatedScratchpad.image}
                onChange={(e) =>
                  setUpdatedScratchpad({
                    ...updatedScratchpad,
                    image: e.target.value,
                  })
                }
              />
              <Textarea
                placeholder="detail"
                detail="detail"
                value={updatedScratchpad.detail}
                onChange={(e) =>
                  setUpdatedScratchpad({
                    ...updatedScratchpad,
                    detail: e.target.value,
                  })
                }
              />
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() =>
                handleUpdateScratchpad(scratchpad._id, updatedScratchpad)
              }>
              Update
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};
export default ScratchpadCard;
