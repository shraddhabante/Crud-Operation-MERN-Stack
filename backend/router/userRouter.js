let express=require("express");
let router=express.Router();
let loginController=require("../controller/userController");

router.post("/signUp",loginController.signUp)
router.post("/signIn",loginController.signIn)
router.get("/getAllUsers",loginController.getAllUsers)
router.patch("/updateUserData/:_id",loginController.updateUserById)
router.delete("/deleteUserData/:id",loginController.deleteUserById)

module.exports=router;