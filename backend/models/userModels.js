import mongoose from "mongoose";
import bcrypt from "bcryptjs"
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{

        type:String,
        required:true,
        minlength:8,
        select:false
    },
    image:{
        type:String,
    },
    searchHistory:{
        type:Array,
        default:[]
    }
},{timestamps:true})

userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        next()
    }
    const salt =await bcrypt.genSalt(10)
    this.password=await bcrypt.hash(this.password,10)
})

userSchema.methods.matchPassword=async function(currentPassword){
    return await bcrypt.compare(currentPassword,this.password)
}

const User=mongoose.model('User',userSchema)

export default User;