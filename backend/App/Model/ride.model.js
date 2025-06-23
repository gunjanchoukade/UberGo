const mongoose = require('mongoose');
const userModel = require('./user.model');

const Schema = mongoose.Schema;

const rideSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: 'userData',
        required: true
    },
    captain:{
        type: Schema.Types.ObjectId,
        ref: 'captainData'
    },
    origin:{
        type: String,
        required: true
    },
    destination:{
        type: String,
        required: true
    },
    fare:{
        type: Number,
        required: true
    },
    status:{
        type: String,
        default: 'Pending',
        enum:['Pending','Ongoing', 'Accepted', 'Completed', 'Cancelled']
    },
    duration:{
        type: Number,
    },
    distance:{
        type: Number
    },
    paymentId:{
        type: String
    },
    orderId:{
        type: String
    },
    signature:{
        type:String
    },
    otp:{
        type: String,
        select: false,
        required: true
    }


})

const rideModel = mongoose.model('Ride', rideSchema);
module.exports = rideModel;