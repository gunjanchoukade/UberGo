import React, { useState } from 'react'
import FinalRide from '../Component/FinalRide'
import { Link } from 'react-router-dom'
import {useLocation} from 'react-router-dom'
const RideStarted = ({passenger}) => {
    const location= useLocation();
    const{ride} =location.state || {}
  
    const[showFinisher,setShowFinisher]=useState(false)
  return (
    <div>

    
        <div className="flex   fixed w-full flex-col justify-end bg-cover bg-center h-screen"style={{ backgroundImage: "url('/src/images/GoogleMapTA.webp')" }}>
            <img className="absolute top-0 w-20" src="https://download.logo.wine/logo/Uber/Uber-Logo.wine.png"></img>
            <div className=' bg-amber-300 rounded-xl p-3 pt-8  '>  {/*white color div*/}
                
                <div className='w-full flex justify-between p-3'>
                    <h2 className='font-semibold text-xl'>4Km away</h2>
                    <button onClick={()=>setShowFinisher(true)} className="w-[50%] mb-4   bg-green-600 font-semibold text-base p-1 text-white rounded-lg">Complete this ride</button>
                    
                </div>
            </div>
            <FinalRide ride={ride} passenger={passenger} showFinisher={showFinisher} setShowFinisher={setShowFinisher}></FinalRide>

        </div>
      
      

      
      

    </div>
  )
}

export default RideStarted
