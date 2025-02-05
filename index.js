import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose"
import userRouter from "./Router/UserRouter.js";
import productRouter from "./Router/ProductRouter.js";
import reviweRouter from "./Router/ReviweRouter.js";
import jwt from "jsonwebtoken"; //get http reqest (json wep token eka amunamma)
import dotenv from "dotenv" //hide github private things
import inquiryRouter from "./Router/InquiryRouter.js";

dotenv.config();//run env file

const app=express();
app.use(bodyParser.json());

 app.use((req,res,next)=>{
    
    let token=req.header  //midleware webtoken reading
    ("Authorization")
    
     if (token!=null){
        token=token.replace("Bearer ","") //"Bearer" Skip this word  
        jwt.verify(token,process.env.jwt_SECRET,
            (err,decoded)=>{                //get error or decoded value
                if(!err){
                    req.user=decoded;      //req eke user kiyana ekata decoded value eka assigning kirima
                }
            }
        )
     }
     next() 
 
})   
  

let mongoURL=process.env.Mongo_URL;
mongoose.connect(mongoURL);
let connection=mongoose.connection;
connection.once("open",()=>{
    console.log("Connection is OK")
})


app.use("/api/user",userRouter);
app.use("/api/product",productRouter);
app.use("/api/reviwe",reviweRouter);
app.use("/api/inquiries",inquiryRouter);


app.listen(3000,()=>{
    console.log("Server port 3000 is running ")
    
});

