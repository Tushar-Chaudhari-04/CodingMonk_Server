const router=require("express").Router();
const orderController=require("../controllers/orderController");
const { verifyToken } = require("../middlewares/verifyToken");

router.post("/payment",verifyToken,orderController.paymentController);

module.exports=router;