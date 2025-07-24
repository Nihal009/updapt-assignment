
// const isAuthenticated =(req,res,next)=>{
// if(req.session && req.session.userId){
//     return next()
// }
// return  res.status(401).json({message:"Unauthorized"})

// }

// export default isAuthenticated;


function isAuthenticated(req,res,next){
    if(req.session.userId){
        next()
    }
    else{
        res.status(401).json({"message":"unauthorized access"})
    }
}

module.exports =isAuthenticated;