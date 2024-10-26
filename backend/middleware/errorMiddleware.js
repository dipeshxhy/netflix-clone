const notFound=(req,res,next)=>{
    const error=new Error(`not found-${req.originalUrl}`)
    res.status(404)
    next(error)
}

const errorHandler=(err,req,res,next)=>{
    let statusCode=res.statusCode===200 ?500: res.statusCode
    let message =err.message
    if(err.name==="CastError" && err.kind==="ObjectId"){
        res.status(404)
        message="Resources Not Found"
    }
    res.status(statusCode).json({
        message:message,
        stack:process.env.NODE_ENV==='development'?err.stack:null
    })
}

export {
    notFound,
    errorHandler
 
}