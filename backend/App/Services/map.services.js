const axios = require('axios')
const captainModel = require('../Model/captain.model')

module.exports.getCoordinates=async (address)=>{
    
    const apiKey = process.env.API_KEY;
    //const url = `https://geocode.search.hereapi.com/v1/geocode?q=${encodeURIComponent(address)}&apikey=${apiKey}`;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${process.env.G_MAP_API}`;
    try{
        const response = await axios.get(url);
        
        if(response.status===200){
            //const object=response.data.items[0].position;
            const object = response.data.results[0].geometry.location;
            console.log('response in map service',object);
            const lat =object.lat;
            const lng = object.lng;
            return{
                lat,
                lng
            }
        }else{
            throw new Error('Unable to find Co ordinates');
        }
    }catch(error){
        console.log(error);
        throw error

    }

}

module.exports.getDistanceAndTimeBetLocations=async (originAddress,destinationAddress)=>{
    if(!originAddress || !destinationAddress){
        throw new Error('Origin and Destination is required')
    }
    try{
        const origin = await this.getCoordinates(originAddress);
        const destination = await this.getCoordinates(destinationAddress);
        const apiKey = process.env.API_KEY;
        // const url = `https://router.hereapi.com/v8/routes?transportMode=car&origin=${origin.lat},${origin.lng}&destination=${destination.lat},${destination.lng}&return=summary&routingMode=fast&apikey=${apiKey}`;
        // const result = response.data.routes[0].sections[0].summary;
        // const distanceInKm = (result.length / 1000).toFixed(2);  
        // const durationInHours = (result.duration / 3600).toFixed(2);

        const url=`https://maps.googleapis.com/maps/api/directions/json?origin=${origin.lat},${origin.lng}&destination=${destination.lat},${destination.lng}&mode=driving&key=${process.env.G_MAP_API}`
        const response = await axios.get(url);
        const result = response.data.routes[0].legs[0];
        const distanceInKm = (result.distance.value / 1000).toFixed(2);  // meters to km
        const durationInHours = (result.duration.value / 3600).toFixed(2);
        return{
            distance:distanceInKm,
            duration:durationInHours
        }
    }
    catch(error){
        throw error;
    }
}

module.exports.getSuggestions= async (input)=>{
    if(!input){
        throw new Error('input is required')

    }

    try{
        // const suggestions = response.data.items.map(item => item.title);
        const apiKey = process.env.API_KEY;
        const mapPro = "AlzaSyTxF7m_0cJ7LxoG6K9JJTfuI918e3ZBBMx"
        // const url=`https://maps.gomaps.pro/maps/api/place/queryautocomplete/json?input=${input}&key=${mapPro}`;
        const url =`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${process.env.G_MAP_API}`;
        const response = await axios.get(url);
        const suggestions =response.data.predictions.map(item => item.description);
        console.log(suggestions);
        return suggestions;
    }catch(error){
        console.log(error);
    }
}


module.exports.getCaptainsInTheRadius = async (ltd, lng, radius) => {

    // radius in km


    const captains = await captainModel.find({
        location: {
            $geoWithin: {
                $centerSphere: [ [ ltd, lng ], radius / 6371 ]
            }
        }
    });

    return captains;


}
