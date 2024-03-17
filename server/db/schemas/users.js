const mongoose  = require("mongoose");
const jwt  = require("jsonwebtoken")
const bcrypt = require("bcryptjs");
const userSchema = mongoose.Schema({
  name: {
    type:String,
      required:[true,"Name is required"]
  },
  email: {
    type:String,
      required:[true,"Email is required"]
  },
  password: {
    type:String,
    required:[true,"Password is required"]
  },
    phone:{
      type:String,     
    },
    role:{
      type:Boolean,
    },
    degree:{
      type:String,
    },
    experience:{
      type:Number,
      default:0
    }
});

userSchema.pre("save",async function(next){
  if(!this.isModified("password"))return next()
  this.password = await bcrypt.hash(this.password,10)
})
userSchema.methods.isPasswordCorrect = async function(password){
  return await bcrypt.compare(password,this.password)
}
userSchema.methods.generateToken = function(){
  return jwt.sign(
    {
      _id:this._id,
      name:this.name,
      email:this.email
    },
    proccess.env.JWT_SECRET,
    {
      expiresIn:process.env.TOKEN_EXPIRY
    }
  )
}
module.exports = mongoose.model("User", userSchema);
