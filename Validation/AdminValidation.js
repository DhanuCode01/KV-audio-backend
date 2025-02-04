
export function isItAdmin(req){         //
    let isAdmin=false;              //this Will change later
    if(req.user.type=="admin"){     // //If you are an admin
        isAdmin=true;
    }
    return isAdmin;
}