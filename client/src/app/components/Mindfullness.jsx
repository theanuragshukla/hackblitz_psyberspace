import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Text,
  Stack,
} from "@chakra-ui/react";
const exercisesData = [
  {
    title: "Deep Breathing",
    description: "Take deep breaths, inhaling and exhaling slowly and deeply.",
  },
  {
    title: "Body Scan",
    description: "Focus your attention on each part of your body, from head to toe, noticing any tension and releasing it.",
  },
  {
    title: "Mindful Walking",
    description: "Take a walk outside and pay close attention to each step you take, the sensations in your feet, and the sounds around you.",
  },
  // Add more exercises as needed
];
export default function Mindfullness() {
  return (
    <Container maxW="container.lg" mt={8}>
    <Heading as="h1" mb={8}>
      Mindfulness Exercises
    </Heading>
    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
      {exercisesData.map((exercise, index) => (
        <Box
          key={index}
          p={6}
          bg="white"
          boxShadow="md"
          borderRadius="md"
          borderWidth="1px"
        >
          <Stack spacing={4}>
            <Heading as="h2" size="md">
              {exercise.title}
            </Heading>
            <Text>{exercise.description}</Text>
          </Stack>
        </Box>
      ))}
    </SimpleGrid>
  </Container>
  );
  }

  
  

  