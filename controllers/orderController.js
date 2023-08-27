const User=require("../models/User")
const Order=require("../models/Order")
const Product=require("../models/Product")
const {success,error}=require("../utils/responseWrapper");
// This is your test secret API key.
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const paymentController=async(req,res)=>{
        try {
            console.log("req",req.body);
            const {products}=req.body;
            console.log("products",products)
            
            const user=await User.findById(req._id);
            !user && res.send(error(500,"User not exists...")) 

            const lineItems=await Promise.all(products.map(async (product)=>{
              const image = product.image
              const productEntries=await Product.findOne({
                    courseName:product.name
              });
              console.log("productEntries",productEntries);
              const realProduct=productEntries;
              console.log("realProduct",realProduct)
              return{
                price_data:{
                  currency:"inr",
                  product_data:{
                    name:realProduct.courseName,
                    images:[realProduct.courseImg]
                  },
                  unit_amount:realProduct.courseSP*100      //realProduct to validate pricing of products
                },
                quantity:1
              }
            }))
            
            console.log("lineItems",lineItems)
            const session = await stripe.checkout.sessions.create({
              shipping_address_collection: {
                allowed_countries: ['IN'],
              },
              line_items:lineItems,
              mode: 'payment',
              success_url: `${process.env.CLIENT_BASE_URL}/payments/success`,
              cancel_url: `${process.env.CLIENT_BASE_URL}/payments/failure`,
            });
      
            console.log("session",session)
            const data =new Order({
                stripeId:session.id,
                products:lineItems

            });
            const orderData=await data.save();
            console.log("orderData",orderData)
            res.send(success(200,{stripeId:session.id}));
        } catch (err) {
            console.log("Error in Payment...",err);
            res.send(error(500,err));
          }
    }

module.exports={
    paymentController
}