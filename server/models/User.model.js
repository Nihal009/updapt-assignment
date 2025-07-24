const mongoose = require("mongoose");
// const { default: Dashboard } = require("../../assignment/src/dashboard");


const UserSchema=mongoose.Schema({
    username:{
        type:String,
        required:true
        },
    
        email:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true,
        },
        privileges:{
            type:Object,
            default:{dashboard:false,platform:false}
        }
       
})

const User=mongoose.model("user",UserSchema);

module.exports=User;
