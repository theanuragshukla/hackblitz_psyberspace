import { Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getDoctors } from "../../data/therepy";
import { profile } from "../../data/user";
import {
    Box,
    chakra,
    Flex,
    Image,
    Link,
    HStack,
    VStack,
} from "@chakra-ui/react";
import { SIDEBAR_ROUTES } from "../../constants";
import { useNavigate } from "react-router-dom";
const specialities = [
    "Depression",
    "Anxiety",
    "Stress",
    "Relationships",
    "Trauma",
    "Grief",
    "Self-esteem",
    "Addiction",
    "Family conflicts",
    "Eating disorders",
    "Sleeping disorders",
    "Parenting",
    "Anger management",
    "Career",
    "Bipolar disorder",
    "Coping with life changes",
    "Compassion fatigue",
    "ADHD",
    "Autism",
    "Child or adolescent",
    "Chronic pain",
    "Codependency",
    "Divorce",
    "Domestic abuse",
    "Drug abuse",
    "Emotional disturbance",
    "Infertility",
    "Infidelity",
    "Life coaching",
    "Life transitions",
];
export default function Appointments() {
    const navigate = useNavigate();
    const [doctors, setDoctors] = useState([]);
    async function getDashboardData() {
        const response = await profile();
        const { status, msg, data } = await getDoctors();
        if (status) {
            setDoctors(data);
        }
    }
    useEffect(() => {
        getDashboardData();
    }, []);
    return (
        <Box w="100%" overflow="hidden">
            <Heading color="orange.500">Appointments</Heading>
            <VStack w="100%" shouldWrapChildren={true}>
                {doctors.length > 0 ? (
                    doctors.slice(1,5).map((doctor) => {
                        return (
                            <Flex
                                bg="#edf3f8"
                                _dark={{
                                    bg: "#3e3e3e",
                                }}
                                p={50}
                                w="full"
                                alignItems="center"
                                justifyContent="center">
                                <Box
                                    w="md"
                                    mx="auto"
                                    py={4}
                                    px={8}
                                    bg="white"
                                    _dark={{
                                        bg: "gray.800",
                                    }}
                                    shadow="lg"
                                    rounded="lg">
                                    <Flex
                                        justifyContent={{
                                            base: "center",
                                            md: "end",
                                        }}
                                        mt={-16}>
                                        {/* <Image
                                            w={20}
                                            h={20}
                                            fit="cover"
                                            rounded="full"
                                            borderStyle="solid"
                                            borderWidth={2}
                                            color="brand.500"
                                            _dark={{
                                                color: "brand.400",
                                            }}
                                            alt="Testimonial avatar"
                                            src="https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=76&q=80"
                                        /> */}
                                    </Flex>

                                    <chakra.h2
                                        color="gray.800"
                                        _dark={{
                                            color: "white",
                                        }}
                                        fontSize={{
                                            base: "2xl",
                                            md: "3xl",
                                        }}
                                        mt={{
                                            base: 2,
                                            md: 0,
                                        }}
                                        fontWeight="bold">
                                        {doctor.name}
                                    </chakra.h2>

                                    <chakra.p
                                        mt={2}
                                        color="gray.600"
                                        _dark={{
                                            color: "gray.200",
                                        }}>
                                        {specialities
                                            .sort(() => 0.5 - Math.random())
                                            .slice(0, 3)
                                            .map((speciality, index) => {
                                                return (
                                                    <chakra.span key={index}>
                                                        {speciality}
                                                    </chakra.span>
                                                );
                                            })}
                                    </chakra.p>

                                    <Flex justifyContent="end" mt={4}>
                                        <Link
                                            onClick={()=>{navigate(SIDEBAR_ROUTES.video)}}
                                            fontSize="xl"
                                            color="brand.500"
                                            _dark={{
                                                color: "brand.300",
                                            }}>
                                            Join Meeting
                                        </Link>
                                    </Flex>
                                </Box>
                            </Flex>
                        );
                    })
                ) : (
                    <h1>No Appointments available</h1>
                )}
            </VStack>
        </Box>
    );
}
