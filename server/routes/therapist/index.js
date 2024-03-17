const router = require("express").Router();
const User = require("../../db/schema/user.js")
const ApiError = require("../../utils/ApiError.js")
const ApiResponse = require('../../utils/ApiResponse.js')

router.get("/", async (req, res, next) => {
  const users = await User.find()
  res.json(users)
})

module.exports = router