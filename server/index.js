require("dotenv").config();
require("./db/connection");
const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http").Server(app);
const logger = require('./utils/logger')
const authRouter = require('./routes/auth')
const  therp = require('./routes/therapist')
const user = require('./routes/user')


const port = process.env.PORT || 8000;


app.use(cors());
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
