import asyncHandler from "express-async-handler" 
import { fetchfromTMDB } from "../service/tmdb.service.js"

const getTrendingMovie=asyncHandler(async(req,res)=>{
const data=await fetchfromTMDB("https://api.themoviedb.org/3/trending/movie/day?language=en-US")
 const randomMovie= data.results[Math.floor(Math.random()*data.results?.length)]
 if(!randomMovie){
     throw new Error("Failed to fetch random movie")
 }
 res.json({content:randomMovie})


})

const getMovieTrailers=asyncHandler(async(req,res)=>{
    const {id}=req.params
    const data=await fetchfromTMDB(`
    https://api.themoviedb.org/3/movie/${id}/videos?language=en-US
        
        `)
    if(!data.results?.length){
        throw new Error("Failed to fetch movie trailers")
    }
    res.json({trailers:data.results})
 
})
const getMovieDetails=asyncHandler(async(req,res)=>{
    const {id}=req.params
    const data=await fetchfromTMDB(`https://api.themoviedb.org/3/movie/${id}?language=en-US`)
    if(!data){
        throw new Error("Failed to fetch user details")
    }
    res.json( {details:data})
})
const getSimilarMovies=asyncHandler(async(req,res)=>{
    
    const {id}=req.params
    const data=await fetchfromTMDB(`https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`)
    if(!data.results?.length){
        throw new Error("Failed to fetch similar movies")
    }
    res.json({similar:data.results})
 
})

const getMoviesByCategory=asyncHandler(async(req,res)=>{
    const {category}=req.params
    const data=await fetchfromTMDB(`https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`)
    if(!data.results?.length){
        throw new Error("Failed to fetch movies by category")
    }
    res.json({content:data.results})
 })

export {
    getTrendingMovie,
    getMovieTrailers,
    getMovieDetails,
    getSimilarMovies,
    getMoviesByCategory
 
}