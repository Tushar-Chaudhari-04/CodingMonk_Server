const router=require("express").Router();
const userController=require("../controllers/userController");
const { verifyToken } = require("../middlewares/verifyToken");

router.get("/getMyProfile",verifyToken,userController.getMyProfile);

module.exports=router;