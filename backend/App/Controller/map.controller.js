const mapServices = require('../Services/map.services')
const {validationResult} = require('express-validator')
module.exports.getCoordinates= async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({ errors: errors.array() });
    }
    try{
        const {address} = req.query;
        const result = await mapServices.getCoordinates(address);
        res.status(200).json(result)
    }catch(error){
        res.status(404).json({msg:'coordinates not found'});
    }
}

module.exports.getDistanceTime=async(req,res)=>{
    try{
        const{origin,destination} = req.query;
        const distanceAndTime = await mapServices.getDistanceAndTimeBetLocations(origin,destination);
        res.status(200).json(distanceAndTime);
        console.log("found route and distance and time");
    }catch(error){
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports.showSuggestion=async (req,res)=>{
    try{
        const {input} =req.query;
        const suggestions = await mapServices.getSuggestions(input);
        res.status(200).json(suggestions)
    }catch(error){
        console.log(error)
        res.status(500).json({msg:'internal server error'})
    }
}