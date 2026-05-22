import jwt from "jsonwebtoken";
export default function authenticateUser (req, res, next) {
    //middleware to parse JSON bodies
    const header=req.headers["authorization"];
    console.log("Authorization header:", header);

    if(header!=null){
        const token=header.replace("Bearer ", "");

    jwt.verify(token, "comp99#12@", 
    (err, decoded) => {
       if(decoded==null){
        res.status(401).json({message: "Unauthorized"})
       }else{
            req.user=decoded
            next()
       }
    })
    
    }else{
    next()
    }

}