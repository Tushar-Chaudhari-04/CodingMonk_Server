//Auth Controller Area

const User = require("../models/User");
const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");
const { success, error } = require("../utils/responseWrapper");

const signupController = async (req, res) => {
  try {
    console.log("user in backend", req);
    const { firstName, lastName, email, password, mobileNo } = req.body;

    //Register Validations Start
    if (!firstName || !lastName || !email || !password || !mobileNo) {
      res.send(error(400, "All fileds are mandatory..."));
    }

    const oldUser =await User.findOne({email});

    if (oldUser) {
      res.send(error(409, "User already exists"));
    }

    //Register Validations End

    const newUser = new User({
      firstName: firstName,
      lastName: lastName,
      mobileNo: mobileNo,
      email: email,
      password: CryptoJS.AES.encrypt(
        password,
        process.env.SECRET_KEY
      ).toString(),
    });

    try {
      if (newUser) {
        console.log("newUser",newUser)
        const user = await newUser.save();
        const { password, ...userData } = user._doc;
      console.log("userData",userData)
        res.send(success(201, userData));
      }
    } catch {
      res.send(error(500, "Error in user registration...Try after some time"));
    }
  } catch (err) {
   // console.log("signup err", err);
    res.send(error(500, err));
  }
};

const loginController = async (req, res) => {
  try {
    console.log("req",req.body);
    const { email, password } = req.body;

    //Login Validations Start
    if (!email || !password) {
      res.send(error(400, "Both Email and Password are mandatory..."));
    }

    const user =await User.findOne({email});
    console.log("login user",user,user.password);
  
    !user && res.send(error(400, "Please use valid credentials..."));
    
    const bytes = CryptoJS.AES.decrypt(
      user.password,
      process.env.SECRET_KEY
    );

    console.log("bytes",bytes);
    const actualPassword=bytes.toString(CryptoJS.enc.Utf8);
    console.log("actualPassword",actualPassword)
    if(actualPassword!==password){
        res.send(error(400, "Please use valid credentials..."));
    }
    //Login Validations End

    try {
        if(user.email===email && actualPassword===password){
            const {password,...userData}=user._doc;
            console.log("userData",userData);
            const accessToken=generateAccessToken(userData);
            console.log("accessToken",accessToken,)
            res.send(success(200,{...userData,accessToken}));
        }else{
          res.send(error(500,"Please use valid Credentials"))
        }
    } catch (err) {
      res.send(500, "Error in login with the given credentials...");
    }
  } catch (err) {
    console.log("error in login", err);
    res.send(error(500, err));
  }
};

//internal functions...
const generateAccessToken=(data)=>{
  const accessToken=jwt.sign(
      {id:data._id,isAdmin:data.isAdmin,email:data.email},
      process.env.ACCESS_TOKEN_SECERET_KEY,
      {expiresIn:"7d"}
  );
  return accessToken;
}

module.exports = {
  signupController,
  loginController,
};
