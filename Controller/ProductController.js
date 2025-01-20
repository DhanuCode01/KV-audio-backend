import products from "../Models/Products.js";

export function  addProduct(req,res){  //add new product

    // console.log(req.user);   //get reqest's user value
     if (req.user==null){           //token ekak thiyeda balamu
        res.status(401).json({
            Message:"pleace login and try again"   
        })
        return
    } 
    
    if (req.user.type !=="Admin"){              //check  authorization(is check the user admin )
        res.status(403).json({
            Message:"your are not authorized to perform this acction"   
        })
        return

    }

    const data=req.body;               //assigning reqest body details 

    const product=new products(data); //add new product
    
    product.save().then(()=>{           //save data
        res.json({
            Message:"product Saved Successfully"
        })
    }).catch((error)=>{
        res.status(500).json({error:"product Saved Unsuccessfully"})
    })
}

