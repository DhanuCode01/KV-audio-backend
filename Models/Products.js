import mongoose from "mongoose";

const productSchema=new mongoose.Schema({
    name:{    //product name Data Structure
        type:String,//Data Type
        required:true,//All product Definetly has name
    },
    price:{    //product Price Data Structure
        type:String,//Data Type
        required:true,//All product Definetly has price
    },
    discription:{    //product discription Data Structure
        type:String,//Data Type
        required:true,//All product Definetly has discription
    }

})
const products=mongoose.model("product",productSchema)
export default products;