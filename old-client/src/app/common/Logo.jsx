import { chakra, Flex, Icon } from "@chakra-ui/react";
import { GiBrain } from "react-icons/gi";

export default function Logo() {
  return (
    <Flex alignItems="center">
      <chakra.a href="/" title="Home Page" display="flex" alignItems="center">
        <Icon as={GiBrain} w="40px" h="40px" />
      </chakra.a>
      <chakra.h1 color="orange.500" fontSize="xl" fontWeight="bold" ml="2">
        PsyberSpace
      </chakra.h1>
    </Flex>
  );
}
