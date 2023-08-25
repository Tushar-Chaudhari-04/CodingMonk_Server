const router=require("express").Router();
const authController=require("../controllers/authController");

router.post("/register",authController.signupController);
router.post("/login",authController.loginController);

module.exports=router;