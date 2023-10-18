const jwt=require("jsonwebtoken");
const {success,error}=require("../utils/responseWrapper");

const verifyToken=(req,res,next)=>{
    try {
        if(!req.headers || !req.headers.authorization || !req.headers.authorization.startsWith==="Bearer") {
            return res.send(error(500,"User is not authorized..."));
        }

        const accessToken=req.headers.authorization.split(" ")[1];
        console.log("accessToken",accessToken);

        try {
            const verifyToken=jwt.verify(
                accessToken,
                process.env.ACCESS_TOKEN_SECERET_KEY,
            )
            console.log("verifyToken",verifyToken);
            if(verifyToken){
                req._id=verifyToken.id;
                next();
            }else{
                return res.send(error(5200,"Token is Expired..."));
            }
        } catch (err) {
            console.log("Token is Expired.Please Login again",err);
            return res.send(error(500,err));
        }
    } catch (err) {
        console.log("err",err);
        return Promise.reject(err);
    }
}
module.exports={
    verifyToken
}