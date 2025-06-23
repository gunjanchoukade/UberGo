const tokenModel = require("../Model/token.model")
const jwt = require("jsonwebtoken")
const captainModel = require("../Model/captain.model")
const dotenv = require("dotenv")
dotenv.config()


module.exports.captainLoginMiddleware=async (req,res,next)=>{
    const token = req.header("Authorization")?.split(" ")[1];

    if(!token){
        return res.status(500).json({msg:"unauthorized access"});  //checks in header
    }

    const tokenInDB = await tokenModel.findOne({token});
    if(!tokenInDB){
        return res.status(200).json({msg:"user already logged out"})
    }

    try{
        const decode = jwt.verify(token,process.env.SECRET_KEY)
        const captain = await captainModel.findById(decode._id)
        req.user = captain
        return next();
    }catch(error){
        console.log(error);
        res.status(500).json({msg:"invalid token",error})
    }

}