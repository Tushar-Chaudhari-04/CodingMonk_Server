//Packages requried for BackEnd
const express=require("express");
const dbConnect=require("./dbConnect");
const dotenv=require("dotenv").config();
const cors = require('cors');
const morgan=require('morgan');
const cookieParser=require('cookie-parser');
const cloudinary = require('cloudinary').v2;
const moment=require('moment');

//App initialization
const app=express(); 

//MongoDB Database Connection
//async await --> take time please wait
dbConnect();    

//app is host on PORT || 4001
app.listen(process.env.PORT || 4001,(req,res)=>{    
    console.log("Coding Baba Server is Working");
});

//App using middlewares
//Cors used for body parser

let origin=process.env.LOCAL_HOST
console.log("process.env.NODE_ENV",process.env.NODE_ENV);
if(process.env.NODE_ENV==='production'){
    origin=process.env.CROS_ORIGIN
}

app.use(cors({
   credential:true,
   origin:origin
}));

app.use(express.json({
    limit:"10mb"
}
));                       //Express providing for json by default 
app.use(morgan('common'));                     //Console Log Apis 
app.use(cookieParser());                       //Adding refreshToken to Cookies


//Routers used in app 
// app.use("/auth",authRouter);                   //Authentication Router
// app.use("/posts",postsRouter);
// app.use("/user",userRouter);

app.get("/",(req,res)=>{
    res.status(200).send("Coding Baba Server is Live");
});



