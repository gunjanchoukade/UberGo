import React, { useEffect, useRef } from "react";
import gsap from 'gsap'



const ConformRide = ({selectedVehicle,setRideDetails,rideDetails,showConform,setShowConform,setWaitDriver}) => {
    const confirmRefDiv = useRef(null)
    useEffect(()=>{
        if(showConform){
            gsap.to(confirmRefDiv.current,{
                transform:'translateY(0)',
                zIndex:100
            })
        }else{
            gsap.to(confirmRefDiv.current,{
                transform:'translateY(100%)',
            })
        }
    },[showConform])

   

  return (
    <div ref={confirmRefDiv} className=" fixed bg-white px-3 pt-8 w-full -z-30 rounded-t-xl border-2 border-gray-50 translate-y-full">
        
        <h2 className="my-2 text-2xl  font-medium mb-7">Confirm your Ride</h2>
        <i onClick={()=>{setShowConform(false),console.log(showConform)}}className="text-gray-400 absolute top-[0px] left-[170px] text-3xl ri-arrow-down-s-line" ></i>
        <div className="flex flex-col justify-between  p-3"> 

            {/* car image  div */}
            <div className="flex justify-center items-center">
                <img
                    className="h-30 w-[70%]"
                    src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_638/v1596627972/assets/e7/e861a8-30ec-4d57-8045-7186f6c5ec35/original/comfort.png"
                ></img>
            </div>

            {/* information div */}
            <div>
                
                <div className="flex border-b-2 ">
                    <i className="text-xl mt-3 ri-map-pin-2-fill"></i>
                    <div className="leading-tight ml-3 p-2" >
                        <h2 className=" text-lg font-semibold">Destination</h2>
                        <p className="text-sm text-gray-500">{rideDetails.destination}</p>
                    </div>
                </div>
                <div className="flex border-b-2  ">
                    <i className="text-xl mt-3 ri-map-pin-user-line"></i>
                    <div  className="leading-tight ml-3 p-2">
                        <h2 className=" text-lg font-semibold">Origin</h2>
                        <p className="text-sm text-gray-500">{rideDetails.origin} </p>
                    </div>
                </div >
                <div className="flex ">
                    <i className="text-xl mt-3 ri-currency-line"></i>
                    <div className="leading-tight ml-3 p-2">
                        <h2 className=" text-lg font-semibold">₹{rideDetails.fare}</h2>
                        <p className="text-sm text-gray-500">Cash Cash </p>
                    </div>
                </div>
            </div>

            {/* conform button */}
            <button onClick={()=>{setWaitDriver(true);setShowConform(false)}}className=" mt-3 w-full bg-green-600 p-2 rounded font-semibold text-white">Confirm</button>
        </div>

    </div>
  );
};

export default ConformRide;


