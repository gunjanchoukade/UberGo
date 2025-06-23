import React from "react";
import 'remixicon/fonts/remixicon.css'
import axios from "axios";  
const LocationSuggestion =  ({setVehicle,suggestions,setOrigin,setDestination,whichInput}) => {
  // let locations = [
  //   "24B Kapoor's caffe Rustom Heights Mumbai",
  //   "Shephard Royal Shashtri hello dear NagarGoregaon west",
  //   "22A Sinhgad College ,Vadgaon Pune ",
  //   "16C Gada Chowk Ambegaon,Pune",
  // ];
  
  return (
    <div>
      {
        suggestions.map((val,indx)=>(
          <div key={indx} onClick={()=>{
            if(whichInput === 'origin')setOrigin(val);
            if(whichInput === 'destination')setDestination(val);
          }}
           className='flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start'>
            <h2 className='bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full'><i className="ri-map-pin-fill"></i></h2>
            <h5 className='font-medium'>{val}</h5>
          </div>
        ))
      }


    </div>
  );
};

export default LocationSuggestion;


