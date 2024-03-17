const router = require("express").Router();
const User = require("../../db/schemas/users.js")
const ApiError = require("../../utils/ApiError.js")
const ApiResponse = require('../../utils/ApiResponse.js')
const asyncHandler = require('../../utils/asyncHandler.js')

const generateToken = async (userId)=>{
  try{
    const user = await User.findById(userId)
    // const 
  }catch{
    
  }
}
router.post('/login', async (req, res)=>{
  const {email, password} = req.body
  const data = await auth.login({
    email,
    password
  })
  res.json(data)
})


router.post('/signup', asyncHandler(async(req, res)=>{
  const {firstName, lastName="", email, password} = req.body
  if(
    [firstName,email,password].some((field)=>field?.trim()==="")
  ){
    throw new ApiError(400,"All fields are required")
  }
  const name = firstName+lastName
  const existedUser = await User.findOne({email})
  if(existedUser){
    throw new ApiError(409,"This user already exists")
  }
  const user = await User.create({
    name,
    email,
    password
  })

  const createdUser = await User.findById(user._id)
  if(!createdUser){
    throw new ApiError(500,"Something went wrong while registering user")
  }
  
  return res
  .status(201)
  .json(new ApiResponse(true,"User create successfully",createdUser))

})
)



module.exports = router
