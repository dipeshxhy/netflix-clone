import express from "express"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import path from "path"
import connectDB from "./config/db.js"
import { errorHandler, notFound } from "./middleware/errorMiddleware.js"

dotenv.config()

//routes
import authRoutes from "./routes/authRoutes.js"
import movieRoutes from "./routes/movieRoutes.js"
import tvRoutes from "./routes/tvRoutes.js"
import searchRoutes from "./routes/searchRoutes.js"
import { protectRoute } from "./middleware/authMiddleware.js"

const _dirname=path.resolve()

const PORT=process.env.PORT || 5000
connectDB()


const app=express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

//api
app.use("/api/auth",authRoutes)
app.use("/api/movie",protectRoute,movieRoutes)
app.use("/api/tv",protectRoute,tvRoutes)
app.use("/api/search",protectRoute,searchRoutes)

//static files
if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(_dirname,"frontend/dist")))
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(_dirname,"frontend","dist","index.html"))
    })
}


app.use(notFound)
app.use(errorHandler)


app.listen(PORT,()=>{
    console.log(`server is running on port :${PORT}`)
})
