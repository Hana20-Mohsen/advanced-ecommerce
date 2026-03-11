

export const asyncHandler=(func)=>{
    return (req , res , next)=>{
        func(req , res , next).catch(error=>{
            // return res.status(500).json({status:'fail' , message:'server error' , error:error.message})
            return next(new Error(error , {cause:500}))
        })
    }
}


export const globalErrorHandling=(error , req , res , next)=>{
    return res.status(error.cause||400).json({status:'fail' , message:'global error' , error:error.message})
}
