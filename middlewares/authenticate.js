import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

export default function authenticateUser (req, res, next) {
    //middleware to parse JSON bodies
    const header=req.headers["authorization"];
    console.log("Authorization header:", header);

    if(header!=null){
        const token=header.replace("Bearer ", "");

    jwt.verify(token,process.env.JWT_SECRET, 
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