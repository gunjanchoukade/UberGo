import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { captainDataContext } from '../context/CaptainContext'
import { userDataContext } from '../context/UserContext'

const CaptainSignup = () => {
    const {backendURL} = useContext(userDataContext)
    let[registerData,setRegisterData]=useState({
            fullname:{
                firstname:'',
                lastname:''
            },
            email:'',
            password:''
    })
    let[Firstname,setFirstname]=useState('')
    let[Lastname,setLastname]=useState('')
    let[Email,setEmail]=useState('')
    let[Password,setPassword]=useState('')
    let[vehicleColor,setVehicleColor]=useState('')
    let[vehiclePlate,setVehicleplate]=useState('')
    let[vehicleCapacity,setVehiclecapacity]=useState('')
    let[vehicleType,setVehicleType]=useState('')

   

    const navigate = useNavigate();
    const {captain,setCaptain} = useContext(captainDataContext)
    let handleSubmit=async (event)=>{
        event.preventDefault();
        const captainData ={
            fullname:{
                firstname:Firstname,
                lastname:Lastname
            },
            email:Email,
            password:Password,
            vehicle:{
                color:vehicleColor,
                plate:vehiclePlate,
                capacity:vehicleCapacity,
                vehicleType:vehicleType
            }
        }
        try{
            const response = await axios.post(`${backendURL}/uber/captain/register`,captainData);
            if(response.status === 200){
                const data = response.data;
                console.log('data is captain signup',data);
                setCaptain(data.data);
                
                console.log('captain in captain signup',captain)
                navigate('/captain-login')
            }
        }catch(err){
            console.log(err)
        }
        
    }
    useEffect(() => {
        console.log("captain in signup page", captain);
    }, [captain]);

    return (
    <div className='p-5 flex h-screen flex-col justify-between'>
            <div>
                <img className='w-20 mb-7' src='https://download.logo.wine/logo/Uber/Uber-Logo.wine.png'></img>
                <form onSubmit={(event)=>{handleSubmit(event)}} >

                    <h3 className='my-2 text-lg  font-medium'>What's our Captain name?</h3>
                    <div className='flex gap-4'>
                        <input onChange={(e)=>{setFirstname(e.target.value)}} 
                        type='text' 
                        placeholder='Firstname'
                        required
                        className='bg-[#eeeeee] w-1/2 border py-2 px-3 rounded text-lg mb-4'
                        name='firstname'
                        value={Firstname}
                        />

                        <input onChange={(e)=>{setLastname(e.target.value)}}  
                        type='text' 
                        placeholder='Lastname'
                        required
                        className='bg-[#eeeeee] w-1/2 border py-2 px-3 rounded text-lg mb-4'
                        name='lastname'
                        value={Lastname}
                        />
                    </div>
                    <h3 className='text-lg my-2 font-medium'>What's our Captain email?</h3>
                    <input  onChange={(e)=>{setEmail(e.target.value)}}
                    type='email' 
                    placeholder='Enter your email'
                    required
                    className='bg-[#eeeeee] w-full border py-2 px-3 rounded text-lg mb-4'
                    name='email'
                    value={Email}
                    />
    
                    <h3 className='my-2 text-lg  font-medium'>Enter password</h3>
                    <input onChange={(e)=>{setPassword(e.target.value)}}
                    type='password' 
                    required
                    placeholder='password'
                    className='bg-[#eeeeee] w-full border py-2 px-3 rounded text-lg mb-4'
                    name='password'
                    value={Password}
                    />

                    <h3 className='my-2 text-lg  font-medium'>Vehicle Information</h3>
                    <div className='flex gap-4'>
                        <input onChange={(e)=>{setVehicleColor(e.target.value)}} 
                        type='text' 
                        placeholder='Vehicle Color'
                        required
                        className='bg-[#eeeeee] w-1/2 border py-2 px-3 rounded text-lg mb-4'
                        name='color'
                        value={vehicleColor}
                        />

                        <input onChange={(e)=>{setVehicleplate(e.target.value)}}  
                        type='text' 
                        placeholder='Vehicle Plate'
                        required
                        className='bg-[#eeeeee] w-1/2 border py-2 px-3 rounded text-lg mb-4'
                        name='plate'
                        value={vehiclePlate}
                        />
                    </div>
                    <div className='flex gap-4'>
                        <input onChange={(e)=>{setVehiclecapacity(e.target.value)}} 
                        type='text' 
                        placeholder='Vehicle Capacity'
                        required
                        className='bg-[#eeeeee] w-1/2 border py-2 px-3 rounded text-lg mb-4'
                        name='capacity'
                        value={vehicleCapacity}
                        />

                        <select onChange={(e)=>{setVehicleType(e.target.value)}}  
                        type='text' 
                        placeholder='Vehicle Type'
                        required
                        className='bg-[#eeeeee] w-1/2 border py-2 px-3 rounded text-lg mb-4'
                        name='vehicleType'
                        value={vehicleType}
                        >
                            <option value="" disabled>Select Vehicle Type</option>
                            <option value='car'>car</option>
                            <option value='moto'>moto</option>
                            <option value='auto'>auto</option>
                        </select>
                    </div>
                    <button className='mt-4 w-full bg-black text-white px-3 py-2 rounded font-semibold'>Create Captain Account</button>
                </form>
                <p className='text-center mt-3 font-medium'>Already have an account? <Link to='/captain-login' className='text-blue-600'>Login</Link> </p>
            </div>
    
            <div>
                <p className='text-[8px] leading-tight text-gray-700'>By proceeding you consent to get Email,WhatsApp or SMS messages from Uber and it affiliates.Text "STOP" to 89203 to opt out.
                    This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.
                </p>
            </div>
        </div>
  )
}

export default CaptainSignup
