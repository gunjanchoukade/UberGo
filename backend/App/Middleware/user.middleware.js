const dotenv = require("dotenv")
dotenv.config()
const jwt = require("jsonwebtoken")
const tokenModel = require('../Model/token.model');
const userModel = require("../Model/user.model");
module.exports.userLoginMiddleware=async (req,res,next)=>{

    const token = req.header('Authorization')?.split(' ')[1]; //finds in the header
    if(!token){
        return res.status(401).json({msg:"unauthorized"});
    }

    const tokenInDb = await tokenModel.findOne({token});  //finds in the database
    if(!tokenInDb){
        return res.status(500).json({msg:"token expired"})
    }

    try{
        const decode = jwt.verify(token,process.env.SECRET_KEY)
        
        const user = await userModel.findById(decode._id)

        //similiar method
        //  req.user = await User.findById(tokenInDB.userId).
        console.log("user in middleware",user)

        req.user = user;
        return next();
    }catch(error){
        console.log(error.message)
        return res.status(500).json({msg:"unauthorized",error:error});
    }
}