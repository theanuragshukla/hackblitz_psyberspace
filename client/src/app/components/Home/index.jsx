import {
  Flex,
  Container,
  Heading,
  Stack,
  Text,
  Button,
  Box,
  Image,
  VStack,
  chakra
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { howCanWeHelpData, mentalHealthData, ROUTES } from "../../../constants";
import MentalHealthCard from "../../common/MentalHealthCard";

const Illustration = () => {
  return <Image src="/assets/mentalHealth.png" />;
};

export default function Home() {
  const navigate = useNavigate();
  return (
    <Container maxW={"5xl"}>
      <Stack
        textAlign={"center"}
        align={"center"}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}
      >
        <Heading
          fontWeight={600}
          fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
          lineHeight={"110%"}
        >
          Mental Health{" "}
          <Text as={"span"} color="accent">
            made easy
          </Text>
        </Heading>
        <Text color={"gray.500"} maxW={"3xl"}>
          Find the right therapist for you. We provide a safe space for you to
          talk about your mental health.
        </Text>
        <Stack spacing={6} direction={"row"}>
          <Button
            rounded={"full"}
            px={6}
            onClick={() => navigate(ROUTES.SIGNUP)}
            colorScheme={"orange"}
            bg={"orange.400"}
            _hover={{ bg: "orange.500" }}
          >
            Get started
          </Button>
          <Button
            rounded={"full"}
            px={6}
            onClick={() => {
              document
                .getElementById("learn-more")
                .scrollIntoView({ behavior: "smooth" });
            }}
          >
            Learn more
          </Button>
        </Stack>
        <Flex w={"full"}>
          <Box height={{ sm: "20rem", lg: "24rem" }}>
            <Illustration />
          </Box>
        </Flex>
        <VStack width="100%" gap={8} id="learn-more">
          <Heading
            size="xl"
            color="polarNight.100"
            bg="whiteAlpha.700"
            width="100%"
          >
            More about mental health
          </Heading>
          {mentalHealthData.map((data, index) => (
            <MentalHealthCard key={index} data={data} />
          ))}
          <Heading
            size="xl"
            color="polarNight.100"
            bg="whiteAlpha.700"
            width="80%"
          >
            How does <chakra.span color="orange"> psyberSpace</chakra.span> help?
          </Heading>

          {howCanWeHelpData.map((data, index) => (
            <MentalHealthCard key={index} data={data} />
          ))}
        </VStack>
      </Stack>
    </Container>
  );
}
