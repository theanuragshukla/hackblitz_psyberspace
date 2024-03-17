const asyncHandler = require("../utils/asyncHandler.js");
const jwt = require("jsonwebtoken")
const ApiError = require("../utils/ApiError.js")
const User = require("../db/schemas/users.js")
const verifyToken = asyncHandler(async(req,_,next)=>{
    const token = req.cookies?.Token;
    console.log(token, "token")
    try{
    if(!token){
        throw new ApiError(400,"Unauthorized request")
    }
    const decodedToken = await jwt.verify(token,process.env.JWT_SECRET)

    const user = await User.findById(decodedToken?._id).select("-password")
    if(!user){
        throw new ApiError(400,"Invalid Access Token")
    }
    req.user = user
    next()
}
catch (error) {
        throw new ApiError(401,error?.message||"Invalid access token")
   }
})
module.exports = verifyToken