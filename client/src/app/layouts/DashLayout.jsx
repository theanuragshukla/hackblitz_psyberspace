import React from "react";
import {
    Icon,
    Box,
    Flex,
    Input,
    Avatar,
    InputGroup,
    InputLeftElement,
    IconButton,
    useColorModeValue,
    useDisclosure,
    Drawer,
    DrawerOverlay,
    DrawerContent,
    Collapse,
} from "@chakra-ui/react";

import { FiMenu, FiSearch } from "react-icons/fi";
import { FaBell, FaDumbbell, FaLaptopMedical } from "react-icons/fa";
import {
    MdChatBubble,
    MdHome,
    MdKeyboardArrowRight,
    MdMeetingRoom,
} from "react-icons/md";

import { BsGearFill } from "react-icons/bs";
import Logo from "../common/Logo";
import { Outlet, useNavigate } from "react-router-dom";
import { SIDEBAR_ROUTES } from "../../constants";
import { GiDoctorFace } from "react-icons/gi";

export default function DashLayout() {
    const sidebar = useDisclosure();
    const integrations = useDisclosure();
    const color = useColorModeValue("gray.600", "gray.300");
    const navigate = useNavigate();

    const NavItem = (props) => {
        const { icon, children, ...rest } = props;
        return (
            <Flex
                align="center"
                px="4"
                pl="4"
                py="3"
                cursor="pointer"
                color="inherit"
                _dark={{
                    color: "gray.400",
                }}
                _hover={{
                    bg: "gray.100",
                    _dark: {
                        bg: "gray.900",
                    },
                    color: "gray.900",
                }}
                role="group"
                fontWeight="semibold"
                transition=".15s ease"
                {...rest}>
                {icon && (
                    <Icon
                        mx="2"
                        boxSize="4"
                        _groupHover={{
                            color: color,
                        }}
                        as={icon}
                    />
                )}
                {children}
            </Flex>
        );
    };

    const SidebarContent = (props) => (
        <Box
            as="nav"
            pos="fixed"
            top="0"
            left="0"
            zIndex="sticky"
            h="full"
            pb="10"
            overflowX="hidden"
            overflowY="auto"
            bg="white"
            _dark={{
                bg: "gray.800",
            }}
            border
            color="inherit"
            borderRightWidth="1px"
            w="60"
            {...props}>
            <Flex px="4" py="5" align="center">
                <Logo />
            </Flex>
            <Flex
                direction="column"
                as="nav"
                fontSize="sm"
                color="gray.600"
                aria-label="Main Navigation">
                <NavItem
                    icon={MdHome}
                    onClick={() => navigate(SIDEBAR_ROUTES.home)}>
                    Home
                </NavItem>
                <NavItem
                    icon={MdMeetingRoom}
                    onClick={() => navigate(SIDEBAR_ROUTES.appointments)}>
                    My Appointments
                </NavItem>

                <NavItem
                    icon={FaDumbbell}
                    onClick={() => navigate(SIDEBAR_ROUTES.mindfullness)}>
                    Mindfullness Exercises
                </NavItem>

                <NavItem
                    icon={FaLaptopMedical}
                    onClick={() => navigate(SIDEBAR_ROUTES.therepists)}>
                    Find Therapists
                </NavItem>
                <NavItem icon={MdChatBubble} onClick={integrations.onToggle}>
                    Chat Support
                    <Icon
                        as={MdKeyboardArrowRight}
                        ml="auto"
                        transform={integrations.isOpen && "rotate(90deg)"}
                    />
                </NavItem>
                <Collapse in={integrations.isOpen}>
                    <NavItem
                        onClick={() => navigate(SIDEBAR_ROUTES.community)}
                        pl="12"
                        py="2">
                        Group Chat
                    </NavItem>
                    <NavItem
                        pl="12"
                        py="2"
                        onClick={() => navigate(SIDEBAR_ROUTES.ai)}>
                        Ai Chat
                    </NavItem>
                </Collapse>
                <NavItem
                    icon={BsGearFill}
                    onClick={() => navigate(SIDEBAR_ROUTES.update)}>
                    Settings
                </NavItem>
            </Flex>
        </Box>
    );

    return (
        <Box
            as="section"
            bg="gray.50"
            _dark={{
                bg: "gray.700",
            }}
            minH="100vh">
            <SidebarContent
                display={{
                    base: "none",
                    md: "unset",
                }}
            />
            <Drawer
                isOpen={sidebar.isOpen}
                onClose={sidebar.onClose}
                placement="left">
                <DrawerOverlay />
                <DrawerContent>
                    <SidebarContent w="full" borderRight="none" />
                </DrawerContent>
            </Drawer>
            <Box
                ml={{
                    base: 0,
                    md: 60,
                }}
                transition=".3s ease">
                <Flex
                    as="header"
                    align="center"
                    justify="space-between"
                    w="full"
                    px="4"
                    bg="white"
                    _dark={{
                        bg: "gray.800",
                    }}
                    borderBottomWidth="1px"
                    color="inherit"
                    h="14">
                    <IconButton
                        aria-label="Menu"
                        display={{
                            base: "inline-flex",
                            md: "none",
                        }}
                        onClick={sidebar.onOpen}
                        icon={<FiMenu />}
                        size="sm"
                    />
                    <InputGroup
                        w="96"
                        display={{
                            base: "none",
                            md: "flex",
                        }}>
                        <InputLeftElement color="gray.500">
                            <FiSearch />
                        </InputLeftElement>
                        <Input placeholder="Search for articles..." />
                    </InputGroup>

                    <Flex align="center">
                        <Icon color="gray.500" as={FaBell} cursor="pointer" />
                        <Avatar
                            ml="4"
                            size="sm"
                            name="anubra266"
                            src="https://avatars.githubusercontent.com/u/30869823?v=4"
                            cursor="pointer"
                        />
                    </Flex>
                </Flex>

                <Box as="main" p="4" w="100%" minH="100vh">
                    <Outlet />
                </Box>
            </Box>
        </Box>
    );
}
