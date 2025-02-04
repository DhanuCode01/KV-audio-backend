import products from "../Models/Products.js";

export async function  addProduct(req,res){     //add new product 
                                                //To run await, the function is specified as async.

    // console.log(req.user);   //get reqest's user value
     if (req.user==null){           //token ekak thiyeda balamu
        res.status(401).json({
            Message:"pleace login and Try again"   
        })
        return
    } 
    
    if (req.user.type !=="admin"){              //check  authorization(is check the user admin )
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


export async function getProducts(req,res){             //viwe products             //To run await, the function is specified as async.
    
    if (req.user==null){           //if you have a token
        res.status(401).json({
            Message:"pleace login and Try again"   
        })
        return
    }
    
    let isAdmin=false;              //this Will change later
    if(req.user.type=="admin"){     // //If you are an admin, all reviews will be displayed.
        isAdmin=true;
    }
    

     try{

        if(isAdmin){
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

