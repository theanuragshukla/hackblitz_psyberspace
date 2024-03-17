import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
    useToast,
    Checkbox,
  } from "@chakra-ui/react";
  import { useState } from "react";
  import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
  import { updateProfile } from "../../data/user";
  import { useNavigate } from "react-router-dom";
  import { ROUTES } from "../../constants";
  
  export default function UpdateForm() {
    const [formData, setFormData] = useState({
      phone: "",
      role: false,
      degree: "",
      experience: 0,
    });
  
    const toast = useToast();
    const navigate = useNavigate();
  
    const handleFormChange = (e) => {
      const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
      setFormData({ ...formData, [e.target.name]: value });
    };
  
    const handleFormSubmit = async (e) => {
      e.preventDefault();
      console.log(formData);
      const { status, msg, data } = await updateProfile(formData);
      if (status) {
        toast({
          title: "Update Successful", 
          description: "Thanks for updating details",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        navigate(ROUTES.DASHBOARD);
      } else {
        toast({
          title: "Update Failed",
          description: msg || "Something went wrong",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    };
  
    return (
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} minW={"xl"} maxW={"xl"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"} textAlign={"center"}>
              Update Details
            </Heading>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
            width="100%"
          >
            <form onSubmit={handleFormSubmit}>
              <Stack spacing={4}>
                <FormControl id="phone" isRequired>
                  <FormLabel>Phone Number</FormLabel>
                  <Input
                    type="text"
                    onChange={handleFormChange}
                    name="phone"
                    value={formData.phone}
                  />
                </FormControl>
                <FormControl id="role" isRequired>
                  <HStack alignItems={"center"}>
                    <FormLabel>Is Therapist</FormLabel>
                    <Checkbox
                        size="md"
                      name="role"
                      onChange={handleFormChange}
                      isChecked={formData.role}
                    />
                  </HStack>
                </FormControl>
                <FormControl id="degree" isRequired>
                  <FormLabel>Degree</FormLabel>
                  <Input
                    type="text"
                    value={formData.degree}
                    name="degree"
                    onChange={handleFormChange}
                  />
                </FormControl>
                <FormControl id="experience" isRequired>
                  <FormLabel>Experience</FormLabel>
                  <Input
                    type="number"
                    value={formData.experience}
                    name="experience"
                    onChange={handleFormChange}
                  />
                </FormControl>
                <Stack spacing={10} pt={2}>
                  <Button
                    loadingText="Submitting"
                    size="lg"
                    bg={"blue.400"}
                    color={"white"}
                    _hover={{
                      bg: "blue.500",
                    }}
                    onClick={handleFormSubmit}
                  >
                    Update
                  </Button>
                </Stack>
              </Stack>
            </form>
          </Box>
        </Stack>
      </Flex>
    );
  }
  