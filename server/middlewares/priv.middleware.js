const session = require("express-session");
const User = require("../models/User.model");



async function DashBoardAccess(req,res,next){
    const email=req.session.email
    const user=await User.findOne({email})
    console.log(user)
    const priv=user.privileges.dashboard
    if(priv){
        console.log("priv",priv)
        next()
    }
    else{
        res.status(401).json({"message":"unauthorized access"})
    }
}


async function PlatformAccess(req,res,next){
    const email=req.session.email
    const user=await User.findOne({email})
    console.log(user)
    const priv=user.privileges.platform
    if(priv){
        console.log("priv",priv)
        next()
    }
    else{
        res.status(401).json({"message":"unauthorized access"})
    }
}


module.exports ={DashBoardAccess,PlatformAccess};