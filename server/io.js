const data = {
    user: null,
    doctor: null,
};

const Gemini = require("./utils/genaicode");
const ai = new Gemini();

module.exports = (io) => {
    io.on("connection", (socket) => {
        const uid = socket.handshake.query.uid;
        const vid = socket.handshake.query.video;
        socket.vid = vid === "true";
        socket.uid = uid;
        socket.partner = null;
        console.log("socket connected: ", socket.uid, socket.vid);

        socket.on("pair", (id) => {
            console.log("pairing with: ", id);
            socket.vidid = id;
            if (!data.doctor) {
                data.doctor = socket;
                if (data.user) {
                    data.user.emit("paired", id);
                    socket.emit("paired", data.user.vidid);
                    socket.data.connected = true;
                    data.user.data.connected = true;
                }
            } else {
                data.user = socket;
                if (data.doctor) {
                    data.doctor.emit("paired", id);
                    socket.emit("paired", data.doctor.vidid);
                    socket.data.connected = true;
                    data.doctor.data.connected = true;
                }
            }
        });

        socket.on("msg", (msg) => {
            if (!socket.data.connected) {
                socket.emit(
                    "newMsg",
                    "Server",
                    "You are not connected to Anyone"
                );
                return;
            } else {
                if (socket.id === data.doctor.id) {
                    data.user.emit("newMsg", "Doctor", msg);
                } else {
                    data.doctor.emit("newMsg", "Patient", msg);
                }
            }
        });
        socket.on("disconnect", () => {
            console.log("socket disconnected:", socket.uid);
            if (socket.vid) {
                if (socket === data.doctor) {
                    data.doctor = null;
                } else {
                    data.user = null;
                }
            } else {
                if (socket.partner) {
                    socket.partner.partner = null;
                }
            }
        });
        socket.on("join-room", (roomId, userId) => {
            socket.join(roomId);
            socket.to(roomId).emit("user-connected", userId);
        });
        socket.on("ai-chat", async (msg) => {
            const res = await ai.chat(msg);
            console.log(res, "res");
            socket.emit("ai-msg", !!res ? res : "I am not able to understand");
        });
    });
};
