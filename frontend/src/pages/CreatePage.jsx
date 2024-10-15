import { useState } from "react";
import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  useColorModeValue,
  useToast,
  VStack,
  Textarea,
} from "@chakra-ui/react";
import { useScratchpadJournal } from "../journal/scratchpad";

const CreatePage = () => {
  const [newScratchpad, setNewScratchpad] = useState({
    name: "",
    detail: "",
    image: "",
  });
  const toast = useToast();

  const { createScratchpad } = useScratchpadJournal();

  const handleAddScratchpad = async () => {
    const { success, message } = await createScratchpad(newScratchpad);
    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        isClosable: true,
      });
    } else {
      toast({
        title: "Success",
        description: message,
        status: "success",
        isClosable: true,
      });
    }
    setNewScratchpad({ name: "", detail: "", image: "" });
  };

  return (
    <Container maxW={"container.sm"}>
      <VStack spacing={8}>
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
          Create New Scratchpad
        </Heading>

        <Box
          w={"full"}
          bg={useColorModeValue("white", "gray.800")}
          p={6}
          rounded={"lg"}
          shadow={"md"}>
          <VStack spacing={4}>
            <Input
              placeholder="Scratchpad Name"
              name="name"
              value={newScratchpad.name}
              onChange={(e) =>
                setNewScratchpad({ ...newScratchpad, name: e.target.value })
              }
            />
            <Input
              placeholder="Image URL"
              name="image"
              value={newScratchpad.image}
              onChange={(e) =>
                setNewScratchpad({ ...newScratchpad, image: e.target.value })
              }
            />
            <Textarea
              placeholder="detail"
              name="detail"
              type="string"
              value={newScratchpad.detail}
              onChange={(e) =>
                setNewScratchpad({ ...newScratchpad, detail: e.target.value })
              }
            />
            <Button colorScheme="blue" onClick={handleAddScratchpad} w="full">
              Add Scratchpad
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};
export default CreatePage;
