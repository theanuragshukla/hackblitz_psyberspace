import { useEffect, useRef, useState } from "react";
import { Flex, Button, Grid, GridItem, Show } from "@chakra-ui/react";
import { FaMicrophone, FaVideoSlash, FaPhone } from "react-icons/fa";
import ChatBox from "../common/ChatBox";
import Peer from "peerjs";
import { useNavigate } from "react-router-dom";
import { profile } from "../../data/user";
const SERVER = "http://localhost:8000";
const PEER_SERVER = "localhost";
const PEER_PORT = 8000;

const OmegleVideoChatPage = () => {
  const cam1 = useRef();
  const cam2 = useRef();
  const navigate = useNavigate();
  const io = require("socket.io-client");
  const [socket, setSocket] = useState(null);
  const [peer, setPeer] = useState(null);
  const [stream1, setStream1] = useState(null);
  const [stream2, setStream2] = useState(null);
  const [peers, setPeers] = useState(null);
  const [miniVid, setMiniVid] = useState(null);
  const miniScreen = useRef();
  const [c1, setC1] = useState(true);

  function endConn(id) {
    if (peers) {
      peers.close();
    }
    if (stream1) stream1.forEach((track) => track.stop);
    setStream1(() => null);
  }

  const connectToNewUser = async (userId) => {
    if (!peer) {
      return;
    }
    const call = await peer.call(userId, stream2);
    setPeers(() => call);
    call.on("stream", (remoteStream) => {
      setStream1(remoteStream);
    });
  };

  const getVideo = async () => {
    return await navigator.mediaDevices
      .getUserMedia({ video: { width: 480, height: 360 }, audio: true })
      .then((stream) => stream);
  };
  async function peerConnection() {
    return new Peer({
      path: `/peer`,
      secure: false,
      host: PEER_SERVER,
      port: PEER_PORT,
      config: {
        iceServers: [
          { url: "stun:stun.l.google.com:19302" },
          { url: "stun:stun1.l.google.com:19302" },
        ],
        heartbeat: {
          interval: 5000,
          timeout: 15000,
        },
      },

      debug: 3,
    });
  }

  useEffect(() => {
    if (miniScreen.current) miniScreen.current.srcObject = miniVid;
  }, [miniVid, miniScreen]);

  useEffect(() => {
    setMiniVid(() => (c1 ? stream2 : stream1));
  }, [c1, stream1, stream2]);
  useEffect(() => {
    if (!cam1.current) return;
    console.log(c1);
    cam1.current.srcObject = c1 ? stream1 : stream2;
  }, [cam1, c1, stream1, stream2]);

  useEffect(() => {
    if (!cam2.current) return;
    cam2.current.srcObject = stream2;
  }, [stream2, cam2]);

  const getSocket = async (uid) => {
    return await io(`${SERVER}/`, { query: `uid=${uid}&video=true` });
  };

  useEffect(() => {
    if (!socket) return;
    socket.on("paired", (userId) => {
      connectToNewUser(userId);
    });
  }, [socket]);

  useEffect(() => {
    if (!peer) return;
    peer.on("call", (call) => {
      call.answer(stream2);
      call.on("stream", (remoteStream) => {
        setStream1(() => remoteStream);
      });
      setPeers((prev) => ({ ...prev, [call.peer]: call }));
    });

    peer.on("open", (id) => {
      socket.emit("pair", id);
      console.log(id, "open");
    });
  }, [peer]);

  useEffect(() => {
    const onloadVideo = async () => {
      const stream = await getVideo();
      setStream2(stream);
      const prof = await profile();
      const uid = prof.data[0].uid;
      const socket = await getSocket(uid);
      const peer = await peerConnection();
      setPeer(() => peer);
      setSocket(() => socket);
    };
    onloadVideo();
  }, []);

  return (
    <Grid w="100%" h="100%" bg="gray.100" templateRows="1fr">
      <GridItem>
        <Grid
          w="100%"
          h={{ base: "calc(100vh - 80px)" }}
          bg="white"
          templateRows={{ base: "1fr", sm: "1fr 1fr" }}
          templateColumns={{ base: "1fr", sm: "1fr 1fr" }}
          templateAreas={{
            base: `"cam1" "chat" "controls"`,
            sm: `"cam1 cam2" "chat chat" "controls controls"`,
          }}
        >
          <GridItem
            area="cam1"
            pos="relative"
            bg="green.200"
            boxSizing="border-box"
            border=" 4px solid blanchedalmond"
            borderBottomWidth="2px"
          >
            <Flex
              w="100%"
              justify="center"
              height="100%"
              pos="absolute"
              zIndex={0}
              bg="black"
            >
              {stream1 ? (
                <Flex
                  transform="rotateY(180deg)"
                  pos="absolute"
                  zIndex={1}
                  justify="center"
                  height="100%"
                  bg="black"
                >
                  <video autoPlay ref={cam1} height="100%" />
                </Flex>
              ) : (
                <img
                  src="https://media.tenor.com/wpSo-8CrXqUAAAAi/loading-loading-forever.gif"
                  alt=""
                />
              )}
            </Flex>
            <Show below="sm">
              <Flex
                transform="rotateY(180deg)"
                pos="absolute"
                zIndex={2}
                justify="center"
                height="60px"
                width="80px"
                bg="blanchedalmond"
                border="2px solid blanchedalmond"
                borderLeftWidth={0}
                bottom={0}
                right={0}
                borderRadius="0 200vmax 200vmax 0"
                overflow="hidden"
              >
                <video
                  autoPlay
                  ref={miniScreen}
                  height="100%"
                  onClick={() => {
                    setC1((prev) => !prev);
                  }}
                />
              </Flex>
            </Show>
            <svg
              viewBox="0 0 4 3"
              width={{ base: "100%", sm: "auto" }}
              height={{ base: "auto", sm: "100%" }}
              fill="red"
            />
          </GridItem>
          <Show above="sm">
            <GridItem
              pos="relative"
              area="cam2"
              bg="green.200"
              border=" 4px solid blanchedalmond"
              borderTopWidth="2px"
            >
              <Flex
                w="100%"
                justify="center"
                height="100%"
                pos="absolute"
                zIndex={0}
                bg="black"
              >
                {stream2 ? (
                  <Flex
                    zIndex={1}
                    transform="rotateY(180deg)"
                    pos="absolute"
                    h="100%"
                    w="100%"
                  >
                    <video muted autoPlay ref={cam2} height="100%" />
                  </Flex>
                ) : (
                  <img
                    src={
                      "https://media.tenor.com/wpSo-8CrXqUAAAAi/loading-loading-forever.gif"
                    }
                    alt=""
                  />
                )}
              </Flex>

              <svg viewBox="0 0 4 3" width="auto" height="100%" fill="red" />
            </GridItem>
          </Show>
          <GridItem area="chat" bg="blue.500" overflow="hidden">
            <ChatBox socket={socket} video={true} data={{ endConn, peer }} />
          </GridItem>
          <GridItem area="controls" bg="gray.200" p={4}>
            <Flex justify="center" align="center" h="100%">
              <Button
                variant="outline"
                colorScheme="red"
                mr={2}
                leftIcon={<FaPhone />}
              >
                Disconnect
              </Button>
              <Button
                leftIcon={<FaMicrophone />}
                variant="outline"
                colorScheme="green"
                mr={4}
              >
                Mute
              </Button>
              <Button
                leftIcon={<FaVideoSlash />}
                variant="outline"
                colorScheme="red"
              >
                Stop Video
              </Button>
            </Flex>
          </GridItem>
        </Grid>
      </GridItem>
    </Grid>
  );
};

export default OmegleVideoChatPage;
