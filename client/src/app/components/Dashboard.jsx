import { Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getDoctors } from "../../data/therepy";
import React from "react";
import {
    Button,
    ButtonGroup,
    IconButton,
    BsBoxArrowUpRight,
    AiFillEdit,
    BsFillTrashFill,
} from "@chakra-ui/react";
import { profile } from "../../data/user";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/react";
import {
    Box,
    chakra,
    Flex,
    Image,
    Icon,
    Link,
    HStack,
    VStack,
} from "@chakra-ui/react";
import { MdHeadset, MdLocationOn, MdEmail } from "react-icons/md";
import { BsFillBriefcaseFill } from "react-icons/bs";

export default function Dashboard() {
    const [user, setUser] = useState({});
    async function getDashboardData() {
        const { status, msg, data } = await profile();
        if (status) setUser(data[0]);
        const doctors = await getDoctors();
    }
    const data = [
        {
            name: "Daggy",
            created: "7 days ago",
        },
        {
            name: "Anubra",
            created: "23 hours ago",
        },
        {
            name: "Josef",
            created: "A few seconds ago",
        },
        {
            name: "Sage",
            created: "A few hours ago",
        },
    ];
    const color1 = useColorModeValue("gray.400", "gray.400");
    const color2 = useColorModeValue("gray.400", "gray.400");
    const header = ["name", "created", "actions"];

    useEffect(() => {
        getDashboardData();
    }, []);
    return (
        <>
            <Heading color="orange.500">Dashboard</Heading>

            {user == null || user === undefined ? (
                <div>loading...</div>
            ) : (
                <div>
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
                            bg="white"
                            _dark={{
                                bg: "gray.800",
                            }}
                            mx={{
                                lg: 8,
                            }}
                            display={{
                                lg: "flex",
                            }}
                            maxW={{
                                lg: "5xl",
                            }}
                            shadow={{
                                lg: "lg",
                            }}
                            rounded={{
                                lg: "lg",
                            }}>
                            <Box
                                w={{
                                    lg: "50%",
                                }}>
                                <Box
                                    h={{
                                        base: 64,
                                        lg: "full",
                                    }}
                                    rounded={{
                                        lg: "lg",
                                    }}
                                    bgSize="cover"
                                    style={{
                                        backgroundImage:
                                            "url('https://images.unsplash.com/photo-1593642532400-2682810df593?ixlib=rb-1.2.1&ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=750&q=80')",
                                    }}></Box>
                            </Box>

                            <Box
                                py={12}
                                px={6}
                                maxW={{
                                    base: "xl",
                                    lg: "5xl",
                                }}
                                w={{
                                    lg: "50%",
                                }}>
                                <chakra.h2
                                    fontSize={{
                                        base: "2xl",
                                        md: "3xl",
                                    }}
                                    color="gray.800"
                                    _dark={{
                                        color: "white",
                                    }}
                                    fontWeight="bold">
                                    <chakra.span
                                        color="brand.600"
                                        _dark={{
                                            color: "brand.400",
                                        }}>
                                        {user.name}
                                    </chakra.span>
                                </chakra.h2>
                                <chakra.p
                                    mt={4}
                                    color="gray.600"
                                    _dark={{
                                        color: "gray.400",
                                    }}>
                                    Hey there! I am {user.name}, a{" "}
                                    {user.occupation} from {user.location}. I am
                                    here to help you with your mental health.
                                    Feel free to reach out to me.
                                    <VStack
                                        align="initial"
                                        spacing={4}
                                        mt={4}
                                        color="gray.600"
                                        _dark={{
                                            color: "gray.400",
                                        }}>
                                        <HStack>
                                            <Icon
                                                as={MdHeadset}
                                                color="brand.500"
                                                _dark={{
                                                    color: "brand.400",
                                                }}
                                            />
                                            <chakra.p
                                                fontWeight="medium"
                                                _dark={{
                                                    color: "gray.400",
                                                }}>
                                                {user.occupation == null
                                                    ? "fetching..."
                                                    : user.occupation}
                                            </chakra.p>
                                        </HStack>
                                        <HStack>
                                            <Icon
                                                as={MdLocationOn}
                                                color="brand.500"
                                                _dark={{
                                                    color: "brand.400",
                                                }}
                                            />
                                            <chakra.p
                                                fontWeight="medium"
                                                _dark={{
                                                    color: "gray.400",
                                                }}>
                                                {user.location == null
                                                    ? "fetching..."
                                                    : user.location}
                                            </chakra.p>
                                        </HStack>
                                        <HStack>
                                            <Icon
                                                as={MdEmail}
                                                color="brand.500"
                                                _dark={{
                                                    color: "brand.400",
                                                }}
                                            />
                                            <chakra.p
                                                fontWeight="medium"
                                                _dark={{
                                                    color: "gray.400",
                                                }}>
                                                {user.email}
                                            </chakra.p>
                                        </HStack>
                                    </VStack>
                                </chakra.p>

                                <Box mt={8}>
                                    <Link
                                        href="/therapists"
                                        bg="gray.900"
                                        color="gray.100"
                                        px={5}
                                        py={3}
                                        fontWeight="semibold"
                                        rounded="lg"
                                        _hover={{
                                            bg: "gray.800",
                                        }}>
                                        Find Therapist
                                    </Link>
                                </Box>
                            </Box>
                        </Box>
                    </Flex>

                    {/* <Flex
                        w="full"
                        bg="#edf3f8"
                        _dark={{
                            bg: "#3e3e3e",
                        }}
                        p={50}
                        alignItems="center"
                        justifyContent="center">
                        <Table
                            w="full"
                            bg="white"
                            _dark={{
                                bg: "gray.800",
                            }}
                            display={{
                                base: "block",
                                md: "table",
                            }}
                            sx={{
                                "@media print": {
                                    display: "table",
                                },
                            }}>
                            <Thead
                                display={{
                                    base: "none",
                                    md: "table-header-group",
                                }}
                                sx={{
                                    "@media print": {
                                        display: "table-header-group",
                                    },
                                }}>
                                <Tr>
                                    {header.map((x) => (
                                        <Th key={x}>{x}</Th>
                                    ))}
                                </Tr>
                            </Thead>
                            <Tbody
                                display={{
                                    base: "block",
                                    lg: "table-row-group",
                                }}
                                sx={{
                                    "@media print": {
                                        display: "table-row-group",
                                    },
                                }}>
                                {data.map((token, tid) => {
                                    return (
                                        <Tr
                                            key={tid}
                                            display={{
                                                base: "grid",
                                                md: "table-row",
                                            }}
                                            sx={{
                                                "@media print": {
                                                    display: "table-row",
                                                },
                                                gridTemplateColumns:
                                                    "minmax(0px, 35%) minmax(0px, 65%)",
                                                gridGap: "10px",
                                            }}>
                                            {Object.keys(token).map((x) => {
                                                return (
                                                    <React.Fragment
                                                        key={`${tid}${x}`}>
                                                        <Td
                                                            display={{
                                                                base: "table-cell",
                                                                md: "none",
                                                            }}
                                                            sx={{
                                                                "@media print":
                                                                    {
                                                                        display:
                                                                            "none",
                                                                    },
                                                                textTransform:
                                                                    "uppercase",
                                                                color: color1,
                                                                fontSize: "xs",
                                                                fontWeight:
                                                                    "bold",
                                                                letterSpacing:
                                                                    "wider",
                                                                fontFamily:
                                                                    "heading",
                                                            }}>
                                                            {x}
                                                        </Td>
                                                        <Td
                                                            color={"gray.500"}
                                                            fontSize="md"
                                                            fontWeight="hairline">
                                                            {token[x]}
                                                        </Td>
                                                    </React.Fragment>
                                                );
                                            })}
                                            <Td
                                                display={{
                                                    base: "table-cell",
                                                    md: "none",
                                                }}
                                                sx={{
                                                    "@media print": {
                                                        display: "none",
                                                    },
                                                    textTransform: "uppercase",
                                                    color: color2,
                                                    fontSize: "xs",
                                                    fontWeight: "bold",
                                                    letterSpacing: "wider",
                                                    fontFamily: "heading",
                                                }}>
                                                Actions
                                            </Td>
                                            <Td>
                                                <ButtonGroup
                                                    variant="solid"
                                                    size="sm"
                                                    spacing={3}>
                                                    <IconButton
                                                        colorScheme="blue"
                                                        icon={
                                                            <BsBoxArrowUpRight />
                                                        }
                                                        aria-label="Up"
                                                    />
                                                    <IconButton
                                                        colorScheme="green"
                                                        icon={<AiFillEdit />}
                                                        aria-label="Edit"
                                                    />
                                                    <IconButton
                                                        colorScheme="red"
                                                        variant="outline"
                                                        icon={
                                                            <BsFillTrashFill />
                                                        }
                                                        aria-label="Delete"
                                                    />
                                                </ButtonGroup>
                                            </Td>
                                        </Tr>
                                    );
                                })}
                            </Tbody>
                        </Table>
                    </Flex> */}
                </div>
            )}
        </>
    );
}
