const router = require("express").Router();
const ApiError = require("../../utils/ApiError.js")
const ApiResponse = require('../../utils/ApiResponse.js')

// user 
router.get("/", async (req, res, next) => {
    try {
        const users = await User.find({role: true}).select("-password").lean()
        res.json({status: true,message : "Successful", data: users})
    } catch (err) {
        next(new ApiError(500, err.message))
    }
})

module.exports = router