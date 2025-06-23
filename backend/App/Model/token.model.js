const mongoose = require('mongoose')


const tokenSchema = mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    token:{
        type:String,
    },
    expiresIn:{
        type:Date,
        required:true,
    }
})

const tokenModel = mongoose.model("usersToken",tokenSchema)
module.exports=tokenModel;