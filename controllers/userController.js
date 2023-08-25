const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { success, error } = require("../utils/responseWrapper");

const getMyProfile=async(req,res)=>{
    try {
        const user=await User.findById(req._id);
        console.log("user",user)
        !user && res.send(error(500,"Internal Server Error"));
        const {password,...userData}=user._doc;
        res.send(success(200,userData));
    } catch (err){
        res.send(error(500,err));
       console.log("err",err); 
    }
} 

module.exports={
    getMyProfile
}