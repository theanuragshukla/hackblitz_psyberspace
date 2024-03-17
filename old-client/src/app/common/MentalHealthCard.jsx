import { Box, chakra, Flex, Heading, Text, VStack } from "@chakra-ui/react";

const MentalHealthCard = ({ data: { title, description, points } }) => {
  return (
    <Box
      mx="auto"
      px={8}
      py={4}
      rounded="lg"
      shadow="lg"
      bg="white"
      _dark={{
        bg: "gray.800",
      }}
      maxW="2xl"
    >
      <Flex justifyContent="space-between" alignItems="center">
        <Heading
          size="md"
          bg="aurora.300"
          pr={4}
          pl={1}
          py={2}
          color="polarNight.100"
        >
          {title}
        </Heading>
      </Flex>

      <Box mt={2}>
        <chakra.p textAlign="left" mt={2} color="gray.600">
          {description}
        </chakra.p>
      </Box>

      <VStack align="start" mt={4}>
        {points.map((point, index) => (
          <Flex key={index} align="center" color="gray.600">
            <Box as="span" color="accent" fontSize="xl" mr={2}>
              •
            </Box>
            <Text>{point}</Text>
          </Flex>
        ))}
      </VStack>
    </Box>
  );
};
export default MentalHealthCard;
