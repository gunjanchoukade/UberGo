const mongoose = require("mongoose")
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require("dotenv")
dotenv.config()

const captainSchema = new Schema({
    fullname:{
        firstname:{
            type:String,
            required:true,
            min:[3,"first name should be atleast 3 characters"]
        },
        lastname:{
            type:String,
            min:[3,"last name should be atleast 3 characters"]
        }
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        min:[3,"password should be atleast 3 characters"]
    },
    socketId:{
        type:String,
    },
    status:{
        type:String,
        enum: [ 'active', 'inactive' ],
        default: 'inactive',
    },
    vehicle:{
        color:{
            type:String,
            required:true
        }, plate: {
            type: String,
            required: true,
            minlength: [ 3, 'Plate must be at least 3 characters long' ],
        },
        capacity: {
            type: Number,
            required: true,
            min: [ 1, 'Capacity must be at least 1' ],
        },
        vehicleType: {
            type: String,
            required: true,
            enum: [ 'car', 'motorcycle', 'auto' ],
        }
    },
    location:{
        ltd:{
            type:Number
        },
        lng:{
            type:Number
        }
    }

})

captainSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

captainSchema.statics.hashPassword=async function(password){
    return await bcrypt.hash(password,10);
}

captainSchema.methods.generateAuthToken=async function(){
    return await jwt.sign({_id:this.id},process.env.SECRET_KEY,{expiresIn:'24h'})
}
const captainModel = mongoose.model('captainData',captainSchema);
module.exports = captainModel;