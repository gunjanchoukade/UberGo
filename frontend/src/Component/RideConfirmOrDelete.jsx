import React, { useContext, useEffect, useState } from 'react'
import gsap from 'gsap'
import { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { captainDataContext } from '../context/CaptainContext';
import { userDataContext } from '../context/UserContext';


const RideConfirmOrDelete = ({passenger,confirm,setConfirm,setShownewRide}) => {

   
    const ConfirmOrDeletePanel = useRef(null);
    const [otp,setOtp] = useState('')
    const navigate = useNavigate();
    const {backendURL} = useContext(userDataContext)
    
    useEffect(()=>{
        if(confirm){
            gsap.to(ConfirmOrDeletePanel.current,{
                transform:'translateY(0)',
                zIndex:500
            })
        }else{
            gsap.to(ConfirmOrDeletePanel.current,{
                transform:'translateY(100%)'
            })
        }
    },[confirm])

    async function submitHandler(e){
        e.preventDefault()
        
        const response = await axios.get(`${backendURL}/rides/ride-started`,{
            params:{
                rideId:passenger[0]._id,
                otp:otp
            },
            headers:{
            Authorization:`Bearer ${localStorage.getItem('token')}`
            }
        })
        if(response.status === 200){
            navigate('/ride-started',{state:{ride:passenger}}); 
        }
    }
  return (
    <div  ref={ConfirmOrDeletePanel} className="fixed rounded-xl bottom-0 -z-30 w-full bg-white p-3 -translate-y-full"> {/*whitw bg div*/}



        <h2 className="font-semibold text-xl mb-3">Confirm to start the ride</h2>
        <div className='flex justify-between items-center bg-yellow-300 p-2 rounded-lg'>

            <div className='flex  w-full items-center'> {/*photo and name */}
                <img className='rounded-full h-12 w-12 object-cover' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdlMd7stpWUCmjpfRjUsQ72xSWikidbgaI1w&s'></img>
                <h2 className='ml-2 font-medium text-lg text-gray-600'>{passenger.length > 0 ? passenger[0].user.fullname.firstname + " " + passenger[0].user.fullname.lastname : "Temporary Name"}</h2>
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
                    <p className="text-sm text-gray-500">{passenger.length>0?passenger[0].destination:'temp dest address'}</p>
                </div>
            </div>
            <div className="flex border-b-2  ">
                <i className="text-xl mt-3 ri-map-pin-user-line"></i>
                <div  className="leading-tight ml-3 p-2">
                    <h2 className=" text-lg font-semibold">Origin</h2>
                    <p className="text-sm text-gray-500">{passenger.length>0?passenger[0].origin:'temp origin address'}</p>
                </div>
            </div >
            <div className="flex ">
                <i className="text-xl mt-3 ri-currency-line"></i>
                <div className="leading-tight ml-3 p-2">
                    <h2 className=" text-lg font-semibold">₹{passenger.length>0?passenger[0].fare:'192'}</h2>
                    <p className="text-sm text-gray-500">Cash Cash </p>
                </div>
            </div>

        </div>
        <div>
            <input  onChange={(e)=>setOtp(e.target.value)} value={otp} className='mb-3 w-full bg-[#eeeeee] p-3 text-xl rounded-xl' type='number' placeholder='Enter OTP'></input>
        </div>
        <div className=" justify-between mt-4">
            <button onClick={()=>{setConfirm(false),setShownewRide(false)}}className=" mb-4 w-full bg-red-800 font-semibold text-xl p-2 text-white rounded-lg">Delete</button>
            <button onClick={(event) => { submitHandler(event) }} className="w-full mb-4  flex justify-center bg-green-600 font-semibold text-xl p-2 text-white rounded-lg">Confirm</button>
        </div>
    </div>
  )

}

export default RideConfirmOrDelete
