const router = require("express").Router();
const logger = require("../../utils/logger");
const Auth = require("mongo-authify");
const MONGO_URL = process.env.MONGO_URL;

const auth = new Auth(MONGO_URL);

router.get("/", (req, res) => {
  logger.info({
    router: "/auth",
    path: "/",
  });
  res.json({ status: true, msg: "Auth active!" });
});

router.post('/login', async (req, res)=>{
  const {email, password} = req.body
  const data = await auth.login({
    email,
    password
  })
  res.json(data)
})


router.post('/signup', (req, res)=>{
  const {firstName, lastName="", email, password} = req.body
  const data = auth.signup({
    firstName,
    lastName,
    email,
    password
  })
  res.json(data)

})


module.exports = router
