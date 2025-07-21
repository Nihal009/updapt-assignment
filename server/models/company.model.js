const mongoose = require("mongoose");

const CompanySchema=mongoose.Schema(
    {
        CompanyName:{
        type:Number,
        required:true
        },
    
        Location:{
            type:String,
            required:true
        },
         
       
            IsGlobal:{
                type:Boolean,
                required:true,
                default:false
            }
        }

    
);

const Company=mongoose.model("Company",CompanySchema);

module.exports=Company;