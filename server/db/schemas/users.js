import mongoose from "mongoose";

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
  details:{
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
  }
});

modulr.exports = mongoose.model("User", userSchema);
