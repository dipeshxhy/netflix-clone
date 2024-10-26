import jwt from "jsonwebtoken"
import asyncHandler from "express-async-handler";
import User from "../models/userModels.js";

export const protectRoute= asyncHandler(async(req,res,next)=>{
    let token;
    token=req.cookies.jwt
    if(token){
        try{
            const decoded=jwt.verify(token,process.env.JWT_SECRET)
            const user=await User.findById(decoded.userId).select("-password")
            if(!user){
                res.status(404)
                throw new Error('User not found')
            }
            req.user=user;
            next()
        }catch(err){
            res.status(401)
            throw new Error('Not authorized, token invalid')
        }

    }else{
        res.status(401)
        throw new Error('Not authorized, token required')
    }
})
