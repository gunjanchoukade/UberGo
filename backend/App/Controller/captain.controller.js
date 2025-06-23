const {validationResult}=require("express-validator");
const captainModel = require("../Model/captain.model");
const tokenModel = require('../Model/token.model')

module.exports.captainRegister=async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(500).json({error:errors.array()});
        return;
    }

    const{fullname,email,password,vehicle}=req.body;
    let already = await captainModel.findOne({email})

    if(already) return res.status(500).json({msg:"captain already exist"});


    const hash = await captainModel.hashPassword(password);
    const data = {
        fullname,
        email,
        password:hash,
        vehicle
    }
    const captainData = new captainModel(data);
    captainData.save();
    res.status(200).json({msg:"Registration successfull",data});
    return;

}

module.exports.captainLogin=async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(500).json({error:errors.array()})
        return;
    }
    
    let {email,password}=req.body;

    const already = await  captainModel.findOne({email})

    if(!already){
        res.status(500).json({msg:"Invalid credentials"})
    }

    const isMatch = await already.comparePassword(password)

    if(!isMatch){
        res.status(500).json({msg:"Invalid credentials"})
        return;
    }

    const token = await already.generateAuthToken();
    const captainToken = new tokenModel({
        userId:already._id,
        token:token,
        expiresIn:new Date(Date.now()+60*60*1000)
    })
    captainToken.save();
    res.cookie('token', token);
    res.status(200).json({msg:"Login Successfull",captainToken})



}

module.exports.captainProfile=async (req,res)=>{
    res.status(200).json({user:req.user})
}

module.exports.captainLogout=async (req,res)=>{
    try{
        res.clearCookie('token')
        const token = req.header('Authorization')?.split(" ")[1];

        if(!token){
            res.status(500).json({msg:"already logged out"});
        }

        const tokenInDb=await tokenModel.findOneAndDelete({token})
        console.log(tokenInDb)
        if(!tokenInDb){
            res.status(500).json({msg:"already logged out"})
        }
        res.status(200).json({msg:"logged out successfull"})
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Server Error during logout", error: error.message });
    }

}