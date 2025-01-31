import mongoose from "mongoose";

const reviweSchema=new mongoose.Schema({
    email:{
        type:String,
        require:true,
        unique:true    //one email send one reviwe
    },
    name:{
        type:String,
        require:true
    
    },
    rating:{
        type:Number,
        require:true
    },
    date:{
        type:Date,
        require:true,
        default:Date.now() //It's time to post a review
    },
    profilePicture:{
        type:String,
        required:true,
        default:"https://cdn.vectorstock.com/i/1000v/92/16/default-profile-picture-avatar-user-icon-vector-46389216.jpg"
    },
    
    isApproved:{            //is reviwe approved or not approved
        type:String,
        require:true,
        default:false   //If the user does not enter a value "false"
    }
})

const Review =mongoose.model("Reviews",reviweSchema);

export default Review;