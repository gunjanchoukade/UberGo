import React, { useEffect } from "react";
import gsap from "gsap";
import { useRef } from "react";
const DriverFound = ({founded,setFounded,rideConfirmedInfo}) => {   
    
    const foundedRef = useRef(null)
    useEffect(()=>{
        if(founded){
            //console.log("testing",rideConfirmedInfo.captain.fullname.firstname);
            gsap.to(foundedRef.current,{
                transform:'translateY(0)',
                zIndex:500
            })
        }else{
            gsap.to(foundedRef.current,{
                transform:'translateY(100%)',
                zIndex:10, 
            })
        }
    },[founded]);
    
    //console.log("testing",rideConfirmedInfo.captain.fullname.firstname)
    //the gsap animation is remaining will be doing it when it actual wnat to pop(jevha backend ni te ride conform zalyavar )
  return (
    <div ref={foundedRef} className=" fixed bg-white px-3 pt-8 w-full  rounded-t-xl border-2 border-gray-50 translate-y-full">

        <h2 className="my-2 text-2xl  font-medium mb-7">Meet at the pickup point</h2>
        <i onClick={()=>setFounded(false)}className="text-gray-400 absolute top-[0px] left-[170px] text-3xl ri-arrow-down-s-line " ></i>
        <div className="flex flex-col justify-between  p-3"> 

            {/* car image  div */}
            <div className="flex justify-between -mt-2 -ml-6 items-center border-b-2">
                <img
                    className="h-[90px]"
                    src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_638/v1596627972/assets/e7/e861a8-30ec-4d57-8045-7186f6c5ec35/original/comfort.png"
                ></img>

                {/* driver information */}
                <div className="text-right leading-tight">
                    <h2 className="uppercase font-semibold text-gray-500">{rideConfirmedInfo?.captain?.fullname?.firstname || "temponame"}</h2>
                    <h2 className="font-bold text-xl">{rideConfirmedInfo?.captain?.vehicle?.plate || ""}</h2>
                    <p className="font-semibold text-gray-500">{rideConfirmedInfo?.captain?.vehicle?.vehicleType || ""}</p>
                    <h2 className="font-bold text-xl">{rideConfirmedInfo?.otp|| ""}</h2>

                </div>
                {/* {rideConfirmedInfo.captain.vehicle.plate} */}
                {/* {rideConfirmedInfo.captain.vehicle.vehicleType} */}
            </div>

            {/* information div */}
            <div className="mt-5">
                
                {/* user location || pickup location */}
                <div className="flex w-full">
                    <i className="text-xl mt-3 ri-map-pin-user-line"></i>
                    <div  className="leading-tight ml-3 p-2 w-full">
                        <h2 className=" text-lg font-normal">{rideConfirmedInfo.origin}</h2>
                        <p className="text-sm text-gray-500"></p>
                    </div>
                </div >
                
            </div>

           
        </div>


    </div>
  );
};

export default DriverFound;
