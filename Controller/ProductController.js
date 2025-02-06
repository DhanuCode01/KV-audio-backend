import products from "../Models/Products.js";
import {isToken} from "../Validation/TokenValidation.js"
import {isItAdmin} from "../Validation/UserValidation.js"

export async function  addProduct(req,res){     //add new product 
                                                //To run await, the function is specified as async.
    isToken(req,res);//if you have a token
    /*  if (req.user==null){           //token ekak thiyeda balamu
        res.status(401).json({
            Message:"pleace login and Try again"   
        })
        return
    } */

     if (!isItAdmin(req)){              //check  authorization(is check the user admin )
        res.status(403).json({
            Message:"your are not authorized to perform this acction"   
        })
        return

    }  

    const data=req.body;               //assigning reqest body details 
    const product=new products(data); //add new product
    
    try{
            await product.save();           //save data     //The line below in the try will not run until the product saves.
                res.status(200).json({
                    Message:"product Saved Successfully"})
        
    }catch(error){                                                              //If the lines are not running, it is a connection error.
        res.status(500).json({error:"product Saved Unsuccessfully"})
    }

}


export async function getProducts(req,res){    //viwe product          //viwe products             //To run await, the function is specified as async.
    
    /* if (req.user==null){           //if you have a token
        res.status(401).json({
            Message:"pleace login and Try again"   
        })
        return
    } */
    isToken(req,res);//if you have a token
   
     try{

        if(isItAdmin(req)){
        const product=await products.find();             //The line below in the try will not run until the user fine.  
        res.status(200).json(product);                   //The products from "promises", which are one of the "built-in functions" of the mongo DB.

        }else{ 
              const product=await products.find({availability:true});             //The line below in the try will not run until the user fine.  
              res.status(200).json(product);                   //The products from "promises", which are one of the "built-in functions" of the mongo DB. 

        }
     }catch(error){                                                       //If the lines are not running, it is a connection error.
        res.status(500).json({
           error:"database connection un successfully"})
    }
} 


export async function updateProduct(req,res){   //update product
    try{
        isToken(req,res);//if you have a token
        if(isItAdmin(req)){

            const key=req.params.key;    //The key of the product that needs to be changed

            const data =req.body;       //The product that needs to be changed

            await products.updateOne({key,key},data) ;  //The 1st key is the product key to be updated, the 2nd key is the parameter key.
                    res.json({
                        message:"product Update Successfullly"
                    })
            return;

        }else{              //check  authorization(is check the user admin )
            res.status(403).json({
                Message:"your are not authorized to perform this acction"   
            })
            return;
        }

    }catch(error){                                                       //If the lines are not running, it is a connection error.
        res.status(500).json({
           error:"database connection un successfully"})
    }
}

export async function deleteProduct(req,res){   //Delete product
    try{
        isToken(req,res);//if you have a token
        if(isItAdmin(req)){

            const key=req.params.key;    //The key of the product that needs to be changed

            const data =req.body;       //The product that needs to be changed

            await products.deleteOne({key,key}) ;  //The 1st key is the product key to be delete, the 2nd key is the parameter key.
                    res.json({
                        message:"product delete Successfullly"
                    })
            return;

        }else{              //check  authorization(is check the user admin )
            res.status(403).json({
                Message:"your are not authorized to perform this acction"   
            })
            return;
        }

    }catch(error){                                                       //If the lines are not running, it is a connection error.
        res.status(500).json({
           error:"database connection un successfully"})
    }
}
