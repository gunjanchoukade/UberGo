import React, { useState,useEffect, useContext } from "react";
import { useRef } from "react";
import gsap from "gsap"
import axios from "axios";
import { userDataContext } from "../context/UserContext";
const VehicleSelection = ({rideDetails,setRideDetails,origin,destination,fares,showVehicle,setVehicle,setShowConform}) => {

    const showVehicleRef = useRef(null);
    const {backendURL} = useContext(userDataContext)
    useEffect(()=>{
        if(showVehicle){
            gsap.to(showVehicleRef.current,{
                transform:'translateY(0)'
            })
        }else{
            gsap.to(showVehicleRef.current,{
                transform:'translateY(100%)'
            })
        }
    },[showVehicle])

    
    async function createRide(vehicleType){
      
      try{
        const response = await axios.post(`${backendURL}/rides/create`,{
          origin:origin,
          destination:destination,
          vehicleType:vehicleType
        },{
          headers:{
            Authorization:`bearer ${localStorage.getItem('token')}`
          }
        });
        setRideDetails(response.data);
        setShowConform(true);
      }catch(error){
        console.log(error);
      }
    }

  return (
    <div ref={showVehicleRef} className="h-[60%] fixed bg-white px-3 pt-8 w-full z-50 rounded-t-xl border-2 border-gray-50 translate-y-full">
        <h2 className="my-2 text-2xl  font-medium mb-7">Choose your Ride</h2>
      <i onClick={()=>setVehicle(false) } className="text-gray-400 absolute top-[0px] left-[170px] text-3xl ri-arrow-down-s-line"></i>

      <div onClick={()=>createRide('car')} className="flex  p-2 justify-between   border-2 border-gray-50 rounded-xl active:border-black ">
        <div className=" ">
          <img
            className=""
            src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_638/v1596627972/assets/e7/e861a8-30ec-4d57-8045-7186f6c5ec35/original/comfort.png"
          ></img>
        </div>

        <div className="h-full w-[2000px] ml-2 ">
          <h2 className=" leading-tight font-semibold text-xl">
            UberGo<i class="font-light ri-user-fill">4</i>
          </h2>
          <p className="leading-tight font-normal">2 mins away</p>
          <p className="leading-tight text-sm text-gray-500">
            Affordable,compact rides
          </p>
        </div>

        <h2 className="text-xl font-semibold">{`₹${fares.car?fares.car:'...loading'}`}</h2>
      </div>

      {/* sec */}
      <div onClick={()=>createRide('auto')} className="flex  p-2 justify-between   border-2 border-gray-50 rounded-xl active:border-black ">
        <div className=" ">
          <img
            className=""
            src="https://clipart-library.com/2023/Uber_Auto_312x208_pixels_Mobile.png"
          ></img>
        </div>

        <div className="h-full w-[2000px] ml-2 ">
          <h2 className=" leading-tight font-semibold text-xl">
            Auto<i class="font-light ri-user-fill">3</i>
          </h2>
          <p className="leading-tight font-normal">2 mins away</p>
          <p className="leading-tight text-sm text-gray-500">
            Affordable,compact rides
          </p>
        </div>

        <h2 className="text-xl font-semibold">{`₹${fares.auto?fares.auto:'...loading'}`}</h2>
      </div>
      {/* third */}
      <div onClick={()=>createRide('motorcycle')} className="flex  p-2 justify-between   border-2 border-gray-50 rounded-xl active:border-black ">
        <div className="w-[1000px] ">
          <img
            className="size-36]"
            src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png"
          ></img>
        </div>

        <div className="h-full w-[2000px] ml-2 ">
          <h2 className=" leading-tight font-semibold text-xl">
            Moto<i class="font-light ri-user-fill">2</i>
          </h2>
          <p className="leading-tight font-normal">2 mins away</p>
          <p className="leading-tight text-sm text-gray-500">
            Affordable,compact rides
          </p>
        </div>

        <h2 className="text-xl font-semibold">{`₹${fares.motorcycle?fares.motorcycle:'...loading'}`}</h2>
      </div>
      
    </div>
  );
};

export default VehicleSelection;
