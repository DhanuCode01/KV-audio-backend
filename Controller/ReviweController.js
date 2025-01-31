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
   // const user =req.body;
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
