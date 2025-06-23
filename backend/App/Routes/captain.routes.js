const express = require("express")
const capRouter = express.Router()
const {body} = require("express-validator")
const captainController = require("../Controller/captain.controller")
const captainMiddleware = require("../Middleware/captain.middleware")


capRouter.post("/register",[
    body('email').isEmail().withMessage("Invalid email"),
    body('fullname.firstname').isLength({min:3}).withMessage("firstname should be atleast 3 char long"),
    body('fullname.lastname').isLength({min:3}).withMessage("lastname should be atleast 3 char long"),
    body('password').isLength({min:3}).withMessage("password should be atleast 6 char long"),

    body('vehicle.plate').isLength({min:3}).withMessage("plate no should be 3 numbers long"),
    body('vehicle.color').isLength({min:3}).withMessage("color should be atleast 3 char long"),
    body('vehicle.vehicleType').isIn(['car','motorcycle','auto']).withMessage("color should be atleast 3 char long"),
    body('vehicle.capacity').isLength({min:1}).withMessage("vehicle should carry atleast 1 passanger")
    ],captainController.captainRegister
)

capRouter.post("/login",[
    body('email').isEmail().withMessage("invalid email"),
    body('password').isLength({min:3}).withMessage("password should be atleast 6 char long")
    ],captainController.captainLogin
)

capRouter.get("/profile",captainMiddleware.captainLoginMiddleware,captainController.captainProfile)

capRouter.get("/logout",captainMiddleware.captainLoginMiddleware,captainController.captainLogout)
module.exports=capRouter;