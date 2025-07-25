const express = require("express");
const { default: mongoose, Collection } = require("mongoose");
const Company =require('./models/company.model')
require('dotenv').config();
const bcrypt = require("bcryptjs");
const app=express();
const cors = require('cors');
const session = require("express-session");
const User = require("./models/User.model");
const MongoStore = require('connect-mongo');
const isAuthenticated  = require("./middlewares/auth.middleware");
const {DashBoardAccess,PlatformAccess} = require("./middlewares/priv.middleware");
// import isAuthenticated from "./middlewares/auth.middleware";


const store=new MongoStore({
     mongoUrl:process.env.DATABASE_URL,
     collectionName:'mySessions',
     expires:1000*60*60*24
      })
app.use(cors())
//     {
//     origin: 'http://localhost:5173', 
//     credentials: true
// }
// ))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(session({
secret:"my-secret",
resave:false,
saveUninitialized:false,
store:store,
cookie:{
    secure:false,
    httpOnly:true,
    maxAge:1000*60*60*24
},
}))


const mongostring=process.env.DATABASE_URL;
mongoose.connect(mongostring).then(()=>
console.log("db connected successfully !")).catch(()=>console.log("error connecting to the db"))
const database=mongoose.Connection;
// console.log(database)





app.get('/',(req,res)=>{
    res.send("test");
});


app.post('/api/addCompany',isAuthenticated,PlatformAccess,async (req,res)=>{
    try{
        
        const data= await Company.create(req.body)
        res.status(200).json(data)

    }
    catch(error){
        res.status(500).json({"message":error.message})

    }
    
    
})

app.get('/api/getDashboardData',isAuthenticated,DashBoardAccess,async (req,res)=>{
    try{
        
        const Companies=await Company.find();
        
        res.status(200).json(Companies)
    
    }
    catch(error){
    res.status(500).json({message:error.message})
    }
    
    })

app.get('/api/getData',isAuthenticated,PlatformAccess,async (req,res)=>{
try{
    
    const Companies=await Company.find();
    
    res.status(200).json(Companies)

}
catch(error){
res.status(500).json({message:error.message})
}

})

app.delete('/api/delete/:id',isAuthenticated,PlatformAccess,async (req,res)=>{
    
    
    try{
        const {id}=req.params;
    const deletedCompany=await Company.findByIdAndDelete(id)
    res.status(200).json({"message":`{deletedCompany} successfully deleted`})}
    catch (error){
        res.status(500).json({"message":error})
    }

})


//auth

app.post('/api/auth/login', async (req,res)=>{
    console.log("login:",req.body)
    const {email,password}=req.body
    try{
        const user=await User.findOne({email})
        if(!user){
            return res.status(400).json({message:"Invalid email"})
        }
        const ismatch= await bcrypt.compare(password,user.password)
        if(!ismatch){
            return res.status(400).json({message:"Invalid password"})
        }
        const priv=user.privileges
        req.session.userId=user._id;
        req.session.email=user.email
        req.session.username=user.username;
        req.session.privileges=user.privileges
        console.log(req.session.privilages)
        console.log("login successful")
        return res.status(200).json({message:"Login Successful",user:user.username,privileges:priv})
    }
    catch (error){
        res.status(500).json({error:"Login failed"
        })
    }
})

app.post('/api/auth/Signup', async (req,res)=>{
    // console.log(req)
    const {name,email,password}=req.body
    console.log("name,email,password",name,email,password)
    try{
        const userexist=await User.findOne({email});
        if(userexist){
            return res.status(400).json({message:"User already exists"})
        }
        const hashedPassword=await bcrypt.hash(password,10);
        const user=await User.create({username:name,email:email,password:hashedPassword,})
        // req.session.userId=user._id;
        res.status(201).json({message:"Account Created Successfully",user:user.username})
    }
    catch(err){
        res.status(500).json({error:"Registration failed"
        })
    }
})

app.delete('/api/auth/logout',isAuthenticated, async (req,res)=>{
    if(req.session){
        req.session.destroy(err=>{
            if(err){
            res.status(400).json({"message":"Unable to logout"})
        }
        else{
            res.clearCookie('connect.sid');
            res.send("Logout Successful")
        }
        }

        )
    }
    else{
        res.status(200).json({"message":"no active session"})
    }
    
})

app.get('/api/auth/check-auth',async (req,res)=>{
    const _id=req.sessionID
    const session=await mongoose.connection.collection("mySessions").findOne({_id:_id})
    // console.log(session)
    if(session){
        // console.log(req.sessionID)
        const email=req.session.email
        const user=await User.findOne({email})
        // console.log(user)
        const priv=user.privileges
        const username=req.session.username
        console.log(username)
        // const priv=req.session.privileges
        console.log(priv)
        const dashboard=priv["dashboard"]
        const platform=priv["platform"]
        console.log(dashboard)
        console.log(req.session.privileges)
        res.status(200).json({"isAuthenticated":true,dashboard:dashboard,platform:platform,name:username}
        )
    }
    else{
        res.status(401).json({"isAuthenticated":false}
        ) 
    }
})

app.listen(3000,()=>{
    console.log("Server is running on http://localhost:3000")
    
})