const data = {
    user: null,
    doctor: null,
};

module.exports = (io) => {
    io.on("connection", (socket) => {
        const uid = socket.handshake.query.uid;
        const vid = socket.handshake.query.video;
        socket.vid = vid === "true";
        socket.uid = uid;
        socket.partner = null;
        console.log("socket connected: ", socket.uid, socket.vid);

        socket.on("pair", (id, isDoctor) => {
            socket.vidid = id;
            if (isDoctor) {
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
                    data.user.data.connected = true;
                }
            }
        });

        socket.on("msg", (msg) => {
            if (!socket.data.connected) {
                socket.emit("newMsg", {
                    sender: "Server",
                    msg: "You are not connected to Anyone",
                });
                return;
            } else {
                socket.partner.emit("newMsg", { sender: "Server", msg });
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
    });
};
