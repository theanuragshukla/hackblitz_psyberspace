const User = require("../../db/schemas/users.js");

const router = require("express").Router();

const ApiResponse = require("../../utils/ApiResponse.js");
const ApiError = require("../../utils/ApiError.js");

router.get("/", async (req, res) => {

  const userId = req.user._id
  const filteredUsers = await User.find({ _id: { $ne: userId } }).select("-password");
  return res.json(new ApiResponse(true, "Users fetched successfully", filteredUsers));
})

router.get("/:id", async (req, res) => {
console.log(req.params.id, "req.params.id")
  const userId = req.params.id
  const user = await User.findById(userId).select("-password");
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  return res.json(new ApiResponse(true, "User fetched successfully", user));
})
module.exports = router;