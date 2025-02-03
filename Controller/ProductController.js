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
