const router = require("express").Router();
const crypto = require('crypto')
const User = require("../../db/schemas/users.js");
const ApiError = require("../../utils/ApiError.js");
const ApiResponse = require("../../utils/ApiResponse.js");
const asyncHandler = require("../../utils/asyncHandler.js");

router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new ApiError(400, "Both email and password required");
    }
    const user = await User.findOne({ email });
    if (!user) {
      throw new ApiError(400, "User not exist");
    }
    const isPasswordCorrect = await user.isPasswordCorrect(password);
    if (!isPasswordCorrect) {
      throw new ApiError(401, "Invalid user credentials");
    }
    const token = user.generateToken();
    console.log(token, "token");
    const loggedInUser = await User.findById(user._id).select("-password");
    const options = {
      httpOnly: true,
      secure: true,
    };
    const expiryDate = new Date(Number(new Date()) + 7 * 24 * 3600000);
    res.setHeader(
      "Set-Cookie",
      `Token=${token};expires=${expiryDate}; Path=/;HttpOnly`
    );
    return res
      .status(200)
      .json(new ApiResponse(true, "User logged in successfully", loggedInUser));
  })
);

const generateUid = (len = 16) => {
    const uid = crypto.randomBytes(len).toString('hex');
    return uid;
};


router.post(
  "/signup",
  asyncHandler(async (req, res) => {
    const { firstName, lastName = "", email, password } = req.body;
    if ([firstName, email, password].some((field) => field?.trim() === "")) {
      throw new ApiError(400, "All fields are required");
    }
    const name = firstName + " "+ lastName;
    const existedUser = await User.findOne({ email });
    if (existedUser) {
      throw new ApiError(409, "This user already exists");
    }
    const uid = generateUid(16);
    const user = await User.create({
      name,
      email,
      password,
      uid
    });

    const createdUser = await User.findById(user._id).select("-password");
    if (!createdUser) {
      throw new ApiError(500, "Something went wrong while registering user");
    }
    const token = createdUser.generateToken();
    const expiryDate = new Date(Number(new Date()) + 7 * 24 * 3600000);
    res.setHeader(
      "Set-Cookie",
      `Token=${token};expires=${expiryDate}; Path=/;HttpOnly`
    );
    return res
      .status(200)
      .json(new ApiResponse(true, "User create successfully", createdUser));
  })
);

module.exports = router;
