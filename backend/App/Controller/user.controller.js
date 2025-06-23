const validationSchema = require("../Model/validation")
const userModel = require("../Model/user.model")
const tokenModel = require("../Model/token.model")


module.exports.registerData=async (req,res)=>{
    let{fullname,email,password}=req.body;

   let data = {
        fullname:{
            firstname:fullname.firstname,
            lastname:fullname.lastname,
        }  ,
        email,
        password
    }
    const hashPassword = await userModel.hashPassword(password);
    try{
        const isValid = validationSchema.parse(data)
        const alreadyExist = await userModel.findOne({email})
        
        if(alreadyExist){
            res.status(500).json({msg:"user already exist"});
            return;
        }

        let toSave = new userModel({
            fullname: {
                firstname:fullname.firstname,
                lastname:fullname.lastname
            },
            email,
            password:hashPassword
        });
        await toSave.save()
        res.status(200).json({msg:"registration successfull",data});
    }catch(error){
        res.status(500).json({ message: "Validation failed", errors: error.errors })
        console.log(error.errors[0].message);
    }

}

module.exports.loginUser=async (req,res)=>{
    let {email,password} = req.body;
    const exist = await userModel.findOne({email});

    if(!exist){
        res.status(500).json({msg:"Invalid email or password"})
        return;
    }
    const hash = await exist.comparePassword(password)
    if(!hash){
        res.status(500).json({msg:"password is wrong"})
        return;
    }else{
        const token= await exist.generateAuthToken();
        const userToken = new tokenModel({
            userId:exist._id,
            token,
            expiresIn:new Date(Date.now()+60*60*1000)
        });

        userToken.save()
        res.cookie('token',token)
        res.status(200).json({msg:"Login Successfull",token})
    }

}

module.exports.showProfile=async(req,res)=>{
    
    res.status(200).json({user:req.user});
}

module.exports.logoutUser=async (req,res)=>{
    try{
        const token = req.header('Authorization')?.split(' ')[1]
        if(!token){
            return res.status(500).json({msg:"no token.user is already logged out"});
           
        }console.log("token",token);
        const tokenInDB = await tokenModel.findOneAndDelete({token})
        if(!tokenInDB){
            return res.status(500).json({msg:"no token in database"});
        }

        return res.status(200).json({msg:"Logged out successfull"});


    }catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Internal Server Error during logout", error: error.message });
    }
}