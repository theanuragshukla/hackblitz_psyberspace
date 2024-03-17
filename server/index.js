require("dotenv").config();
require("./db/connection");
const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http").Server(app);
const authRouter = require('./routes/auth')
const  therp = require('./routes/therapist')
const user = require('./routes/user')


const port = process.env.PORT || 8000;

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

app.use((err, req, res, next) => {
  logger.error(err.message || "error");
  res.status(500).json({ status: false, msg: err.message });
});

app.use('/user', user)

app.use('/therapist', therp)

http.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});
