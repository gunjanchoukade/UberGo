import gsap from 'gsap'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { userDataContext } from '../context/UserContext'
const FinalRide = ({ride,passenger,showFinisher,setShowFinisher}) => {

  const finisher=useRef(null)
  const navigate = useNavigate()
  const {backendURL} = useContext(userDataContext)
  
    useEffect(()=>{
        console.log('passenger in finalride',passenger)
        if(showFinisher){
            gsap.to(finisher.current,{
                transform:'translateY(0)'
            })
        }else{
            gsap.to(finisher.current,{
                transform:'translateY(100%)'
            })
        }
    },[showFinisher])
    async function handleSubmit(){
        
        try{
            const response = await axios.post(`${backendURL}/rides/ride-end`,{
                rideId:ride[0]._id
            },{
               headers:{
                Authorization:`bearer ${localStorage.getItem('token')}`
               } 
            })

            if(response.status===200){
                navigate('/captain-home');
            }
        }
        catch(error){
            console.log(error)
        }
    }
  return (
    <div  ref={finisher} className="fixed  rounded-xl bottom-0  w-full bg-white p-3 translate-y-full"> {/*whitw bg div*/}

        <i onClick={()=>setShowFinisher(false)} className="text-gray-400 absolute top-[0px] left-[170px] text-3xl ri-arrow-down-s-line"></i>
        <div className='flex justify-between items-center bg-yellow-300 p-2 rounded-lg mt-9'>

            <div className='flex  w-full items-center'> {/*photo and name */}
                <img className='rounded-full h-12 w-12 object-cover' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdlMd7stpWUCmjpfRjUsQ72xSWikidbgaI1w&s'></img>
                <h2 className='ml-2 font-medium text-lg text-gray-600'>{ride[0]?.user?.fullname.firstname+" "+ride[0]?.user?.fullname.lastname||'peri peri'}</h2>
                {/* {passenger[0].user.fullname.firstname + " " + passenger[0].user.fullname.lastname || "Temporary Name"} */}
            </div>

            {/* <div className='leading-tight text-right'>
                <h1 className='text-xl font-semibold' > 2.28Km</h1>
                <p className='text-xs  -ml-80 text-gray-500'>Pickup distance</p>
            </div> */}
        </div>

        <div className="bg-gray-200 p-3 rounded-lg mb-5 mt-5">
                    
            <div className="flex border-b-2 ">
                <i className="text-xl mt-3 ri-map-pin-2-fill"></i>
                <div className="leading-tight ml-3 p-2" >
                    <h2 className=" text-lg font-semibold">Destination</h2>
                    <p className="text-sm text-gray-500">{ride[0]?.destination||'to anywherre'}</p>
                    {/* {passenger[0].destination || 'temp dest address'} */}
                </div>
            </div>
            <div className="flex border-b-2  ">
                <i className="text-xl mt-3 ri-map-pin-user-line"></i>
                <div  className="leading-tight ml-3 p-2">
                    <h2 className=" text-lg font-semibold">Origin</h2>
                    <p className="text-sm text-gray-500">{ride[0]?.origin||'starting from her'}</p>
                    {/* {passenger[0].origin || 'temp origin address'} */}
                </div>
            </div >
            <div className="flex ">
                <i className="text-xl mt-3 ri-currency-line"></i>
                <div className="leading-tight ml-3 p-2">
                    <h2 className=" text-lg font-semibold">₹{ride[0].fare||'187'}</h2>
                    {/* {passenger[0].fare || '192'} */}
                    <p className="text-sm text-gray-500">Cash Cash </p>
                </div>
            </div>

        </div>
        
        <div className=" justify-between mt-4">
            
            <button onClick={handleSubmit} className="w-full mb-4  flex justify-center bg-green-600 font-semibold text-xl p-2 text-white rounded-lg">Finish this ride</button>
            
        </div>
    </div>
  )
}

export default FinalRide
