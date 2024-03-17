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
  import { createAppointment } from "../../data/therepy";
  import { useNavigate, useParams } from "react-router-dom";
  import { ROUTES, SIDEBAR_ROUTES } from "../../constants";
  
  export default function CreateAppointMent() {
    const [formData, setFormData] = useState({
      phone: "",
      role: false,
      degree: "",
      experience: 0,
    });
  
    const toast = useToast();
    const navigate = useNavigate();
  const params = useParams()
    const handleFormChange = (e) => {
      const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
      setFormData({ ...formData, [e.target.name]: value });
    };
  
    const handleFormSubmit = async (e) => {
      e.preventDefault();
      console.log(formData);
      const { status, msg, data } = await createAppointment({...formData, doctor: params.id});
      if (status) {
        toast({
          title: "Appointment Successfully Created", 
          description: "Thanks for updating details",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        navigate(SIDEBAR_ROUTES.appointments);
      } else {
        toast({
          title: "Unable to book appointment right now",
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
              Book An Appointment
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
              <FormControl id="date" isRequired>
                <FormLabel>Date</FormLabel>
                <Input
                  type="date"
                  value={formData.date}
                  name="date"
                  onChange={handleFormChange}
                />
              </FormControl>
              <FormControl id="duration" isRequired>
                  <FormLabel>Duration</FormLabel>
                  <Input
                    type="number"
                    value={formData.duration}
                    name="duration"
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
                    Submit
                  </Button>
                </Stack>
              </Stack>
            </form>
          </Box>
        </Stack>
      </Flex>
    );
  }
  