import { useScratchpadJournal } from "../journal/scratchpad";
import ScratchpadCard from "../components/ScratchpadCard";
import { Container, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function HomePage() {
  const { fetchScratchpads, scratchpads } = useScratchpadJournal();

  useEffect(() => {
    fetchScratchpads();
  }, [fetchScratchpads]);
  console.log("scratchpads", scratchpads);

  return (
    <Container maxW="container.xl" py={12}>
      <VStack spacing={8}>
        <Text
          fontSize={"30"}
          fontWeight={"bold"}
          //          bgGradient={"linear(to-r, , blue.500)"}
          bgClip={"text"}
          textAlign={"center"}>
          Current Scratchpad 🚀
        </Text>

        <SimpleGrid
          columns={{
            base: 1,
            md: 2,
            lg: 3,
          }}
          spacing={10}
          w={"full"}>
          {scratchpads.map((scratchpad) => (
            <ScratchpadCard key={scratchpad._id} scratchpad={scratchpad} />
          ))}
        </SimpleGrid>

        {scratchpads.length === 0 && (
          <Text
            fontSize="xl"
            textAlign={"center"}
            fontWeight="bold"
            color="gray.500">
            No scratchpad found 😢{" "}
            <Link to={"/create"}>
              <Text
                as="span"
                color="blue.500"
                _hover={{ textDecoration: "underline" }}>
                Create a scratchpad
              </Text>
            </Link>
          </Text>
        )}
      </VStack>
    </Container>
  );
}
export default HomePage;
