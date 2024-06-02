import jwt from "jsonwebtoken";
// import {errorHandler} from "./error.js";

const verifyUser = (req,res,next) => {
    const token = req.body.token 
    console.log(token);
    if (!token) {
        return next('Unauthorized');
    }
    jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
        if(err) {
            return next('Unauthorized');
        }
        req.user =user;
        next();
    })
  
};

export  {verifyUser};