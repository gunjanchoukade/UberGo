import React, { useEffect, useRef, useState,useContext } from 'react'
import gsap from "gsap";

import "remixicon/fonts/remixicon.css";
import {useLocation,useNavigate} from 'react-router-dom'
import {socketDataContext} from '../context/SocketContext'

const MakePayment = () => { 
    const paymentPageRef = useRef(null);
    const [adjust,setAdjust] = useState(false);
    const location = useLocation();
    const {rideStarted} = location.state || {};
    const {socket} = useContext(socketDataContext);
    const navigate = useNavigate()
    useEffect(()=>{
        console.log('ridestarted in makepayment page',rideStarted)
        if(adjust){
            gsap.to(paymentPageRef.current, {
                transform: 'translateY(80%)'
            })
        }else{
            gsap.to(paymentPageRef.current,{
                transform:'translateY(0)'
            })
        }
        
    },[adjust])

    socket.on('ride-end',()=>{
        navigate('/main-home')
    })
  return (
    <div className="flex   fixed w-full flex-col justify-end bg-cover bg-center h-screen"style={{ backgroundImage: "url('/src/images/GoogleMapTA.webp')" }}>
    <div ref={paymentPageRef} className=" fixed bottom-0  bg-white px-3 pt-8 w-full rounded-t-xl border-2 border-gray-50 ">

        <h2 className="my-2 text-2xl  font-medium mb-7">Payment please</h2>
        <i onClick={()=>setAdjust(!adjust)} className="text-gray-400 absolute top-[0px] left-[170px] text-2xl ri-expand-up-down-line " ></i>
        <div className="flex flex-col justify-between  p-3"> 
        
            {/* car image  div */}
            <div className="flex justify-between -mt-2 -ml-6 items-center border-b-2">
                <img
                    className="h-[90px]"
                    src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_638/v1596627972/assets/e7/e861a8-30ec-4d57-8045-7186f6c5ec35/original/comfort.png"
                ></img>

                {/* driver information */}
                <div className="text-right leading-tight">
                    <h2 className="uppercase font-semibold text-gray-500">{rideStarted?.captain?.fullname.firstname||'Bruce'}</h2>
                    <h2 className="font-bold text-xl">{rideStarted?.captain?.vehicle.plate||'MH29 XM7829'}</h2>
                    <p className=" uppercase font-semibold text-gray-500">{rideStarted?.captain?.vehicle?.vehicleType||'Yellow Ford Mustang-GT'}</p>
                </div>
            </div>

            {/* information div */}
            <div className="mt-5">
                
                {/* user location || pickup location */}
                <div className="flex">
                    <i className="text-xl mt-3 ri-map-pin-user-line"></i>
                    <div  className="leading-tight ml-3 p-2">
                        <h2 className=" text-lg font-semibold">Origin</h2>
                        <p className="text-sm text-gray-500">{rideStarted?.origin || '17th Cross Rd,PWD Quarters,1st Sector' }</p>
                    </div>
                </div >

                <div className="flex ">
                    <i className="text-xl mt-3 ri-currency-line"></i>
                    <div className="leading-tight ml-3 p-2">
                        <h2 className=" text-lg font-semibold">₹{rideStarted?.fare||'192.23'}</h2>
                        <p className="text-sm text-gray-500">Cash Cash </p>
                    </div>
                </div>
                
            </div>
            <button className=" mt-3 w-full bg-green-600 p-2 rounded font-semibold text-white">Make a payment</button>
        </div>
    </div>
    </div>
  )
}

export default MakePayment
