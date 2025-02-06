import Inquiry from "../Models/Inquiry.js";
import { isItAdmin, isItCustomer } from "../Validation/UserValidation.js";
import {isToken} from "../Validation/TokenValidation.js"

export async function addInquiry (req,res){         //add inquiry
    try {
          isToken(req,res);//if you have a token
        if(isItCustomer(req)){
            const data=req.body;
            data.email=req.user.email;
            data.phone=req.user.phone;  
            
            let id =0;                  //now wont to genarate id
            const inquiries=await  Inquiry.find()           //fine inquiry in database
                .sort({id:-1})              //Sort the existing data in descending order.{Descending is (-1) and ascending is (+1).}
                .limit(1);                  //Reduce the data in descending order to 1.
            

            if(inquiries.length==0) {
                id=1;                       //If there is one or not, id =1
            }else{
                id=inquiries[0].id+1;       //If there is, add one(+1) to that value and take it as id
            }

            data.id=id;

            const newInquiry=new Inquiry(data);
            const responce=await newInquiry.save();     //save new inquiry in database

            res.json({
                message:"inquiry added Successfully",id:responce.id             //send saved successfully message and generrated id
            })
        }
        
    }catch(error){                                                       //If the lines are not running, it is a connection error.
        res.status(500).json({
           error:"database connection un successfully"})
    }
        
}


export async function getInquiriry(req,res){     //viwe inquiry        //Shows the user only their inquiries. //Shows everything to admin.
    
    try{

    isToken(req,res);//if you have a token  
    if(isItCustomer(req)){
        const inquiries =await Inquiry.find({email:req.user.email}); //Check the email for inquiries.
        res.status(200).json(inquiries);

        return;
    }else if (isItAdmin(req)){
        const inquiries =await Inquiry.find(); //Check the email for inquiries.
        res.status(200).json(inquiries);

        return;
    } 
    
}catch(error){                                                      //If the lines are not running, it is a connection error.
    res.status(500).json({
       error:"database connection un successfully"})
}

}


export async function deleteInquiry(req,res) {              //delete the user only their inquiries. //delete everything to admin.
    try {

        isToken(req,res);//if you have a token
        
        if(isItAdmin(req)){
            await Inquiry.deleteOne({id:req.params.id}); // Check if the parameter id is the same as the database id
            res.status(200).json({
                message:"Inquiry delete Successfully"
            });

            return;
        
        }else if(isItCustomer(req)){
            const inquiries=await Inquiry.findOne({id:req.params.id}); // Check if the parameter id is the same as the database id
            
            if(inquiries==null){                                        //have not inquiries or have inquiries
                res.status(404).json({
                    message:"Inquiry not found"
                })
                return;
            }else{
                if(inquiries.email == req.user.email){

                    await Inquiry.deleteOne({id:req.params.id});        
                    res.status(200).json({
                    message:"Inquiry delete Successfully"
                });
                return;

                }else{
                    res.status(403).json({
                        Message:"your are not authorized to perform this acction"   
                    })
                    return

                }

            }
                

        }

        
    }catch(error){                                                      //If the lines are not running, it is a connection error.
        res.status(500).json({
           error:"database connection un successfully"})
    }
    
    
}