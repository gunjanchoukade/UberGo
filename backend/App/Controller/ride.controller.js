const rideService = require('../Services/rides.services')
const {validationResult} = require('express-validator')
const mapService = require('../Services/map.services')
const indexes = require('../../index')
const rideModel = require('../Model/ride.model')
module.exports.creatingRide = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({ errors: errors.array() });
    }

    try{
        const{origin,destination,vehicleType}=req.body;
        const ride = await rideService.createRide({user:req.user._id,origin,destination,vehicleType});
        res.status(200).json(ride);
        //when a ride is created we have to get all the captains in the radius of picup location i:e origin
        const pickUpCoordinates = await mapService.getCoordinates(origin);
        console.log('pickup cordinates',pickUpCoordinates)
        const getCaptains = await mapService.getCaptainsInTheRadius(pickUpCoordinates.lat,pickUpCoordinates.lng,30);
        ride.otp='';
        console.log("captains found",getCaptains);
        const  rideWithuser =  await rideModel.find({_id:ride._id}).populate('user');
        console.log("user socket id,",rideWithuser[0].user.socketId)
       
        //now to send captain a notification that new ride is available
        getCaptains.map((cap)=>{
            indexes.sendMessageToSocketId(cap.socketId,{
                event:'new-ride',
                data:rideWithuser
            });
        })
        

    }catch(error){
        console.log(error)
        res.status(500).json({msg:'Internal server error'});
    }
}

module.exports.rideFares=async (req,res)=>{
    try{
        let {origin, destination} = req.body;
        
        const fares  = await rideService.calculateFare(origin,destination);
        res.status(200).json(fares);
    }
    catch(error){
        console.log(error);
        res.status(500).json({msg:'Internal server error'});
    }

}

module.exports.confirmRide=async (req,res)=>{

    const{rideId} = req.body
    try{
        
        const ride = await rideService.confirmingRide({rideId,captain:req.user});
       
        indexes.sendMessageToSocketId(ride.user.socketId,{
            event:'ride-confirmed',
            data:ride
        })
        return res.status(200).json(ride)
    }
    catch(error){
        console.log(error);
        res.status(500).json({msg:error.message});
    }
}

module.exports.startRide= async(req,res)=>{
    const {rideId,otp} = req.query;

    try{
        const ride = await rideService.startingRide({rideId,otp,captain:req.user});
        console.log('ride in ridecontroller startrdie',ride);
        indexes.sendMessageToSocketId(ride.user.socketId,{
            event:'ride-started',
            data:ride
        })
        res.status(200).json(ride);
    }catch(error){
        console.log(error);
        res.status(500).json({msg:error.message});
    }
}
module.exports.endRide=async (req,res)=>{
    const {rideId} = req.body;
    console.log('ride id in ride Controller',rideId);

    try{
        const ride = await rideService.endingRide({rideId,captain:req.user});

        indexes.sendMessageToSocketId(ride.user.socketId,{
            event:'ride-end',
            data:ride
        })
        res.status(200).json(ride);
    }
    catch(error){
        console.log(error);
        res.status(500).json({msg:error.message})
    }
}   
