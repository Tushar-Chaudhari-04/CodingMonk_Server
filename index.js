//Packages requried for BackEnd
const express=require("express");
const dbConnect=require("./dbConnect");
const env=require("dotenv").config();
const cors = require('cors');
const morgan=require('morgan');
const cookieParser=require('cookie-parser');
const cloudinary = require('cloudinary').v2;
const moment=require('moment');
const bodyParser = require('body-parser')

//Auth Router  
const authRouter=require("./routers/authRouter")
const userRouter=require("./routers/userRouter")
const orderRouter=require("./routers/orderRouter");

//App initialization
const app=express(); 

//MongoDB Database Connection
//async await --> take time please wait
dbConnect();    

let origin=process.env.LOCAL_HOST
console.log("origin",origin);
console.log("process.env.NODE_ENV",process.env.NODE_ENV);
if(process.env.NODE_ENV==='production'){
    origin=process.env.CROS_ORIGIN
}

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECERET
  });

  
//App using middlewares
//Cors used for body pars
// parse various different custom JSON types as JSON
// app.use(bodyParser.json({ type: 'application/*+json' }))
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))


app.use(express.json());
app.use(cors({
  origin:'*',     //or whatever port your frontend is using
  credentials:true,            
  optionSuccessStatus:200,
}));

app.use(express.json({
    limit:"10mb"
}
));                                            //Express providing for json by default 
app.use(morgan('common'));                     //Console Log Apis 
app.use(cookieParser());                       //Adding refreshToken to Cookies


//Routers used in app 
app.use("/auth",authRouter);                     //Authentication Router
app.use("/user",userRouter);  
app.use("/orders",orderRouter);

//app is host on PORT || 4001
app.listen(process.env.PORT || 4001,(req,res)=>{    
    console.log("Coding Baba Server is Working");
});

app.get("/",(req,res)=>{
    res.status(200).send("Coding Baba Server is Live");
});


/*
// // parse some custom thing into a Buffer
// app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }))

// // parse an HTML body into a string
// app.use(bodyParser.text({ type: 'text/html' }))


// app.use((req,res,next)=>{
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// })

*/