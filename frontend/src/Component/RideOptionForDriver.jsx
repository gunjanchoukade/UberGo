import React, { useEffect, useState } from "react";
import gsap from "gsap";
import { useRef } from "react";

const RideOptionForDriver = ({ConfirmRide,passenger,setConfirm,showNewRide,setShownewRide}) => {

    const showingAvailable = useRef(null)
    useEffect(()=>{
        if(showNewRide){
            gsap.to(showingAvailable.current,{
                transform:'translateY(0)',
            })
        }else{
            gsap.to(showingAvailable.current,{
                transform:'translateY(100%)'
            })
        }
    },[showNewRide])
    

    
  return (
    <div  ref={showingAvailable} className="fixed bottom-0  w-full bg-white p-3 translate-y-0"> {/*whitw bg div*/}

        <h2 className="font-semibold text-xl mb-3">New Ride Available!</h2>
        <div className='flex justify-between items-center bg-yellow-300 p-2 rounded-lg'>

            <div className='flex  w-full items-center'> {/*photo and name */}
                <img className='rounded-full h-12 w-12 object-cover' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdlMd7stpWUCmjpfRjUsQ72xSWikidbgaI1w&s'></img>
                <h2 className='ml-2 font-medium text-lg text-gray-600'>{passenger.length > 0 ? passenger[0].user.fullname.firstname + " " + passenger[0].user.fullname.lastname : "Temporary Name"}</h2>
            
            </div>
            {/* {passenger[0].user.fullname.firstname+" "+passenger[0].user.fullname.lastname} */}
            <div className='leading-tight text-right'>
                <h1 className='text-xl font-semibold' > 2.28Km</h1>
                <p className='text-xs  -ml-80 text-gray-500'>Pickup distance</p>
            </div>
        </div>

        <div className="bg-gray-200 p-3 rounded-lg mb-5 mt-5">
                    
            <div className="flex border-b-2 ">
                <i className="text-xl mt-3 ri-map-pin-2-fill"></i>
                <div className="leading-tight ml-3 p-2" >
                    <h2 className=" text-lg font-semibold">{passenger.length>0?passenger[0].destination:'temp dest address'}</h2>
                    <p className="text-sm text-gray-500"></p>
                </div>
            </div>
            <div className="flex border-b-2  ">
                <i className="text-xl mt-3 ri-map-pin-user-line"></i>
                <div  className="leading-tight ml-3 p-2">
                    <h2 className=" text-lg font-semibold">{passenger.length>0?passenger[0].origin:'temp origin address'}</h2>
                    <p className="text-sm text-gray-500"> </p>
                </div>
            </div >
            <div className="flex ">
                <i className="text-xl mt-3 ri-currency-line"></i>
                <div className="leading-tight ml-3 p-2">
                    <h2 className=" text-lg font-semibold">₹{passenger.length>0?passenger[0].fare:'192'}</h2>
                    <p className="text-sm text-gray-500"> </p>
                </div>
            </div>
        </div>
        <div className="flex justify-between">
            <button onClick={()=>setShownewRide(false)}className=" mb-4 w-[30%] bg-red-800 font-semibold text-xl p-1 text-white rounded-lg">Ignore</button>
            <button onClick={()=>{setConfirm(true);ConfirmRide()}}className="w-[30%] mb-4   bg-green-600 font-semibold text-xl p-1 text-white rounded-lg">Accept</button>
        </div>
    </div>
);
};

export default RideOptionForDriver;
