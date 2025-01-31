import Review from "../Models/Review.js";

export function addReviwe(req,res){
     // console.log(req.user);   //get reqest's user value
     if (req.user==null){           //token ekak thiyeda balamu
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

newReviwe.save().then(()=>{           //save data
    res.json({
        Message:"Reviwe add Successfully"
    })
}).catch((error)=>{
    res.status(500).json({error:"Reviwe add Unsuccessfully"})
})

}

//filter reviwe
export function getReviwe(req,res){
   
    if (req.user==null){           //check if you have an token
        res.status(401).json({
            Message:"pleace login and Try again"   
        })
        return
    }

    if (req.user.type != "admin"){              //If you are not an admin, only approved reviews will be shown.
        Review.find({isApproved:true}).then((reviews)=>{
            res.json(reviews);
        })
        return
    } 
    if(req.user.type =="admin"){
        Review.find().then((reviews)=>{                        //If you are an admin, all reviews will be displayed.
            res.json(reviews);
        })
        return
    }
}

// delete router reviwes

export function deleteReviwe(req,res){
    const email=req.params.email;

    
    if (req.user==null){           //check if you have an token
        res.status(401).json({
            Message:"pleace login and Try again"   
        })
        return
    }
    if(req.user.type== "admin"){

        Review.deleteOne({email:email}).then(()=>{
            res.json({Message:"review delete successfully"});      //If you are an admin, delete all
        }).catch(()=>{
            res.status(500).json({error:"review delete failed"})
        });
        return
    }

    if (req.user.type=="customer"){

        Review.deleteOne({email:email}).then(()=>{
            res.json({Message:"review delete successfully"});      //If you are customer,Delete only the rating sent to your email.
        }).catch(()=>{
            res.status(500).json({error:"review delete failed"})
        });

    }else{
        res.status(403).json({error:"your not authorized to perform this acction"})

    }

}

//approved rating(only approvedReviwe)

export function approvedReviwe(req,res){

    const email=req.params.email;

    
    if (req.user==null){           //check if you have an token
        res.status(401).json({
            Message:"pleace login and Try again"   
        })
        return
    }

    if(req.user.type == "admin"){      //if bearer token is admin
        Review.updateOne({
            email:email,                //check If the sent email is the same as the email in the database
        },{
            isApproved:true,            //change approved true
        }).then(()=>{
            res.status(200).json({
                Message:"Review approved Successfully"   
            })
        }).catch(()=>{
            res.status(500).json({
            error:"Review approved Failed"   
        })
    })
    }else{{
        res.status(403).json({error:"your not authorized to perform this acction"})

    }}

}



