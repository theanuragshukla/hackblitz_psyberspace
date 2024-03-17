import ChatBox from "../common/ChatBox";
import { Grid, GridItem } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { profile } from "../../data/user";
const io = require("socket.io-client");
const SERVER = "http://localhost:8000";

const Chat = () => {
  const navigate = useNavigate();
  const [socket, setSocket] = useState();
  useEffect(() => {
    const onloadVideo = async () => {
      const prof = await profile();
      const uid = prof.data[0].uid;
      setSocket(io.connect(`${SERVER}/`, { query: `uid=${uid}&video=false` }));
    };
    onloadVideo();
  }, []);

  return (
    <Grid bg="white" h="100vh" templateRows="1fr" pb={2}>
      <GridItem overflow="hidden">
        <ChatBox socket={socket} />
      </GridItem>
    </Grid>
  );
};

export default Chat;
