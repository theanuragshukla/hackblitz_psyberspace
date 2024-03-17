const User = require("../../db/schemas/users.js");

const router = require("express").Router();

const ApiResponse = require("../../utils/ApiResponse.js");
const ApiError = require("../../utils/ApiError.js");

// router.get("/", async (req, res) => {
//     console.log(req.user, "req.user");
//     const userId = req.user.uid;
//     try {
//         const users = await User.find({ role: true })
//             .select("-password")
//             .lean();
//         return res.json(
//             new ApiResponse(true, "Users fetched successfully", users)
//         );
//     } catch (err) {
//         return res.json(new ApiError(200, err.message));
//     }
// });
//
//
router.get("/", async (req, res) => {
    const uid = req.user.uid
    const user = await User.find({uid}).select("-password");
    if (!user) {
        throw new ApiError(404, "User not found");
    }
    return res.json(new ApiResponse(true, "User fetched successfully", user));
});

router.get("/:id", async (req, res) => {
    const userId = req.params._id;
    const user = await User.findById(userId).select("-password");
    if (!user) {
        throw new ApiError(404, "User not found");
    }
    return res.json(new ApiResponse(true, "User fetched successfully", user));
});

router.post("/update", async (req, res) => {
    const userId = req.user._id;
    const userUPdate = req.body;
    const user = await User.findByIdAndUpdate(userId, userUPdate, {
        new: true,
    }).select("-password");
    try {
        return res.json(
            new ApiResponse(true, "User updated successfully", user)
        );
    } catch (err) {
        return res.json(new ApiError(200, err.message));
    }
});
module.exports = router;
