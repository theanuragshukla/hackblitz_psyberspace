import { useEffect, useState } from "react";
import {
  Flex,
  Input,
  Button,
  VStack,
  Text,
  Grid,
  GridItem,
} from "@chakra-ui/react";

const ChatBox = ({ socket, video = false, data }) => {
  const [messages, setMessages] = useState([
    { sender: "system", msg: "Connecting to your therapist. Please wait..." },
  ]);
  const [inputValue, setInputValue] = useState("");
  const addMessage = (sender, msg) => {
    setMessages((old) => [...old, { sender, msg }]);
  };
  useEffect(() => {
    if (!socket) return;
    socket.on("connect", () => {
      console.log("Connected to server");
      if (!video) socket.emit("pair");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    socket.on("paired", () => {
      console.log(`Paired`);
      setMessages([{ sender: "System", msg: "User connected" }]);
    });

    socket.on("newMsg", ({ sender, msg }) => {
      addMessage("Stranger", msg);
    });

    socket.on("end-conn", (vid) => {
      if (video) {
        data.endConn(vid);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  const handleSend = (e) => {
    console.log(socket)
    if(!socket) return;
    if (e.key !== "Enter") return;
    addMessage("You", inputValue);
    socket.emit("msg", inputValue);
    setInputValue("");
  };

  return (
    <Grid bg="white" h="100%" templateRows="1fr auto" pb={2}>
      <GridItem overflow="scroll">
        <VStack
          alignItems="flex-start"
          justify="flex-end"
          p={4}
          minH="100%"
          overflow="scroll"
        >
          {messages.map((message, index) => (
            <Text
              key={index}
              px={2}
              py={1}
              borderRadius="md"
              bg={message.sender === "You" ? "red.200" : "green.200"}
              color="black.500"
            >
              {message.sender}: {message.msg}
            </Text>
          ))}
        </VStack>
      </GridItem>
      <GridItem>
        <Flex px={4} py={2} gap={2}>
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type a message..."
            borderRadius="full"
            mr={2}
            onKeyDown={handleSend}
          />
        </Flex>
      </GridItem>
    </Grid>
  );
};

export default ChatBox;
