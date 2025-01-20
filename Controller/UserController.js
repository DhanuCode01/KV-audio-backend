import users from "../Models/User.js";
import bcrypt from "bcrypt";
import jwt  from "jsonwebtoken"; //get http reqest (json wep token eka amunamma)


export function reqestUser(req,res){
    const data=req.body;

    data.password=bcrypt.hashSync(data.password,10)//"10"is soluting Routs

    const user=new users(data)



    user.save().then(()=>{
        res.json({
            Message:"User Saved Successfully"
        })
    }).catch((error)=>{
        res.status(500).json({error:"User Saved Unsuccessfully"})
    })
}

export function LoginUser(req,res){
    const data =req.body;

    users.findOne({
        email:data.email
    }).then((user)=>{
        if(user==null){
            res.status(404).json({error:"User is not Found"})
        }else{
        const ispasswordCorrect=bcrypt.compareSync(data.password,user.password);
        if (ispasswordCorrect){

                const token=jwt.sign({                  //login user Data encripted and  send it frontend 
                    firstName:user.firstName,
                    lastName:user.lastName,
                    email:user.email,                   
                    type:user.type,
                },process.env.jwt_SECRET)

                res.json({success:"Login Successfuly",token:token
                    
                })
        }else{
            res.status(401).json({error:"Login Field"}) 
        }
       } 
    })
}
    
