import mongoose from "mongoose";

const inquirySchema=new mongoose.Schema({
    id:{                    //inquiry can uniquely identify
        type:Number,        //data type integer
        required:true,      //All inquiry Definetly has key
        unique:true         //All inquiry Definetly has key
    },
    email:{                 //inquiry Email
        type:String,
        required:true,
        unique:true
    },
    message:{               //inquiry
        type:String,
        required:true
    },
    phone:{                 //phone number
        type:String,
        required:true
    },
    date:{                  //inquiry Date
        type:Date,
        required:true,
        default:Date.now()
    },
    response:{              //inquiry's responce
        type:String,
        required:false,
        default:""
    },
    isResolved:{           //check has a response been sent?
        type:Boolean,
        required:true,
        default:false
    }
})
const Inquiry=mongoose.model("Inquiry",inquirySchema)
export default Inquiry;
