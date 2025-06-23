const express = require("express")
const router = express.Router()
const userController = require("../Controller/user.controller")
const userMiddleware  = require("../Middleware/user.middleware")

router.post("/register",userController.registerData)
router.post("/login",userController.loginUser)
router.get("/profile",userMiddleware.userLoginMiddleware,userController.showProfile)
router.get("/logout",userMiddleware.userLoginMiddleware,userController.logoutUser)
module.exports=router;