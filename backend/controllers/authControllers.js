import asyncHandler from "express-async-handler";
import User from "../models/userModels.js";
import { generateToken } from "../utils/generateToken.js";

const signup=asyncHandler(async(req,res)=>{
const {username,email,password}=req.body
if(!username || !email || !password){
    res.status(400)
    throw new Error("All fields are required")
}
const userExists=await User.findOne({email})
if(userExists){
    res.status(400)
    throw new Error("Email already exists")
}
const usernameExists=await User.findOne({username})
if(usernameExists){
    res.status(400)
    throw new Error("username already exists")
}
if(password.length<8){
    res.status(400)
    throw new Error("Password must be at least 8 characters long")
}
const PROFILE_PICS=["/avatar1.png","/avatar2.png","/avatar3.png"]
const image=PROFILE_PICS[Math.floor(Math.random()*PROFILE_PICS.length)]
const user=await User.create({
    username,
    email,
    password,
 image

})
if(user){
   await generateToken(res,user._id)
    res.status(201).json({user:{

      ...user._doc,
      image,
      
      password:""

    }
      
    })
}else{
    res.status(400)
    throw new Error("Invalid user data")
 
}

})
const login=asyncHandler(async(req,res)=>{
  const {username,password}=req.body
  if (!username || !password) {
    res.status(400);
    throw new Error("Please provide both username and password");
}

  const user=await User.findOne({username}).select("+password")

  if(user && (await user.matchPassword(password))){
    await generateToken(res,user._id)
    res.status(200).json({
      user:{

        ...user._doc,
        image:user.image,
     
        password:""
  
      }
    })


  }else{
    res.status(401)
    throw new Error("Invalid credentials")
  }
    })

    const logout=asyncHandler(async(req,res)=>{
       res.cookie("jwt","",{
         expires:new Date(0),
         httpOnly:true
       })
       res.status(200).json({
         message:"User logged out"
       })

        })

const authCheck=asyncHandler(async(req,res)=>{
  const user=req.user
  if(!user){
    res.status(401)
    throw new Error("You are not authenticated")
  }
  res.status(200).json({
    user
  })
})


export {
    signup,
    login,
    logout,
    authCheck
 
}

