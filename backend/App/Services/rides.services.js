const mapServices = require('./map.services');
const rideModel = require('../Model/ride.model');

async function calculateFare(origin,destination){

    const distanceAndTime = await mapServices.getDistanceAndTimeBetLocations(origin,destination);
    const distance = distanceAndTime.distance;
    const duration = distanceAndTime.duration;
    

    
    const fareRates = {
        auto: 10, // rate per km
        car: 15,  // rate per km
        motorcycle: 8 // rate per km
    };

    const fare = {
        auto:( distance * fareRates.auto).toFixed(2),
        car: (distance * fareRates.car).toFixed(2),
        motorcycle: (distance * fareRates.motorcycle).toFixed(2)
    };

    return fare;

}
module.exports.calculateFare=calculateFare;

function generateOTP() {
    return Math.floor(1000 + Math.random() * 9000).toString();
}
module.exports.createRide=async ({user,origin,destination,vehicleType})=>{
    if(!user || !origin || !destination || !vehicleType){
        throw new Error('Invalid Input');
    }
    const fare = await calculateFare(origin,destination);

    const ride = rideModel.create({
        user,
        origin:origin,
        destination:destination,
        fare:fare[vehicleType],
        otp:generateOTP()
    })
    
    return ride;
}


module.exports.confirmingRide=async ({rideId,captain})=>{
    
    //ride is confirmed so make its status accepted
    await rideModel.findOneAndUpdate({_id:rideId},{
        status:'accepted',
        captain:captain._id//
    })

    const ride = await rideModel.findOne({_id:rideId}).populate('user').populate('captain').select('+otp');
    return ride;
}

module.exports.startingRide = async ({rideId,otp,captain})=>{

    console.log('rideId and Otp in ride services',rideId+" "+otp);
    if(!rideId || !otp ){
        throw new Error('Ride id and Otp are required');
    }

    const ride = await  rideModel.findOne({_id:rideId}).populate('user').populate('captain').select('+otp');

    if(!ride){
        throw new Error('Ride not found');
    }

    if(otp != ride.otp){
        throw new Error('Invalid otp');
    }
    await rideModel.findOneAndUpdate({_id:rideId},{
        status:'ongoing'
    })

    return ride;
}

module.exports.endingRide = async({rideId,captain})=>{
    if(rideId===undefined ||rideId ===null){
        throw new Error("invalid ride id");
    }

    const ride = await rideModel.findOne({
        _id:rideId,
        captain:captain._id
    }).populate('user').populate('captain').select('+otp')

    if(!ride)
    {
        throw new Error('ride not found');
    }

    await rideModel.findOneAndUpdate({_id:rideId},{
        status:'completed'
    })
    return ride;
}