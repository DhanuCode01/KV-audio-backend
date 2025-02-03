import Review from "../Models/Review.js";

export async function addReviwe(req,res){           //To run await, the function is specified as async.
     // console.log(req.user);   //get reqest's user value
     if (req.user==null){           //check have a token
        res.status(401).json({
            Message:"pleace login and Try again"   
        })
        return
    } 


const data =req.body;       //assigning reqest body details  

data.name=req.user.firstName +" "+ req.user.lastName; //data name =reqest names   (In the decoded token attached to the request)
data.profilePicture=req.user.profilePicture;
data.email=req.user.email;

const newReviwe=new Review(data);

try{                                        //The line below in the try will not run until the new reviwe saves.
       await newReviwe.save();           //save data
            res.status(200).json({
             Message:"Reviwe add Successfully"
            })
}catch(error){                                                      //  //If the lines are not running, it is a connection error.
    res.status(500).json({error:"Reviwe add Unsuccessfully"})
}

}

//filter reviwe
export async function getReviwe(req,res){                //To run await, the function is specified as async.
   
    if (req.user==null){           //check if you have an token
        res.status(401).json({
            Message:"pleace login and Try again"   
        })
        return
    }



    if (req.user.type != "admin"){              //If you are not an admin, only approved reviews will be shown.
        try{
                const reviews=await Review.find({isApproved:true});             //The line below in the try will not run until the user fine.  
                    res.status(200).json(reviews);                                              //The user reviews from "promises", which are one of the "built-in functions" of the mongo DB.
                   
        }catch(error){                                                       //If the lines are not running, it is a connection error.
            res.status(500).json({
               error:"database connection un successfully"})
        }


        return
    } 



    if(req.user.type =="admin"){                  //If you are an admin, all reviews will be displayed.

          try{
            const reviews=await Review.find();             //The line below in the try will not run until the user fine.  
                res.status(200).json(reviews);                         //The user reviews from "promises", which are one of the "built-in functions" of the mongo DB.
               
            }catch(error){                                                       //If the lines are not running, it is a connection error.
                res.status(500).json({
                    error:"database connection un successfully"})
            }


       
        return
    }
}





// delete router reviwes

export async function deleteReviwe(req,res){         //To run await, the function is specified as async.
    const email=req.params.email;

    
    if (req.user==null){           //check if you have an token
        res.status(401).json({
            Message:"pleace login and Try again"   
        })
        return
    }

    if(req.user.type== "admin"){                        //If you are an admin, delete all

        try{
                await Review.deleteOne({email:email});                          //The line below in the try will not run until the user fine. 
                    res.status(200).json({Message:"review delete successfully"});      

        }catch(exception){
            res.status(500).json({error:"review delete failed"})               //If the lines are not running, it is a connection error.
        };
        return
    }

    if (req.user.type=="customer"   &&  req.user.email==email){

        try{
                await Review.deleteOne({email:email});
                        res.status(200).json({Message:"review delete successfully"});      //If you are customer,Delete only the rating sent to your email.
        }catch(exception){

                        res.status(500).json({error:"review delete failed"})                ////If the lines are not running, it is a connection error.
        };

    }else{
        res.status(403).json({error:"your not authorized to perform this acction"})

    }

}

//approved rating(only approvedReviwe)

export async function approvedReviwe(req,res){              //To run await, the function is specified as async.

    const email=req.params.email;

    
    if (req.user==null){           //check if you have an token
        res.status(401).json({
            Message:"pleace login and Try again"   
        })
        return
    }

    if(req.user.type == "admin"){      //if bearer token is admin
        try{

            await Review.updateOne({email:email}                //check If the sent email is the same as the email in the database
            ,{
                isApproved:true,            //change approved true
            })
            res.status(200).json({
                Message:"Review approved Successfully"   
            })
        }catch(error){
            res.status(500).json({
            error:"Review approved Failed"              //If the lines are not running, it is a connection error.
        })
    }
    }else{{
        res.status(403).json({error:"your not authorized to perform this acction"})

    }}

}



