require("dotenv").config();
require("./db/connection.js");
const chat = require("./io");
const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http").Server(app);
const  therp = require('./routes/therapist')
const user = require('./routes/user')
const verifyToken = require('./middlewares/auth.middleware.js');
const { ExpressPeerServer } = require("peer");
const authRouter = require('./routes/auth')
const port = process.env.PORT || 8000;
const cookieParser = require('cookie-parser')

app.use(cookieParser())

app.use(
    cors({
        credentials: true,
        origin: ['http://localhost:3000'],
        methods: ['GET', 'POST'],
    })
);
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Credentials', true);
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_, res) => {
  res.json({ status: true, msg: "Alive!" });
});


app.use('/auth', authRouter)

app.use(verifyToken)


app.use( '/user', user)

app.use('/therapist',therp)


const server = http.listen(port, () => {
  console.log(`Server is running on port ${port}`)
});

const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});
const peerServer = ExpressPeerServer(server, {
    debug: true,
});
app.use("/peer", peerServer);
chat(io);
