import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import {userDataContext} from "../context/UserContext"
const UserSignup = () => {
    const navigate = useNavigate()

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


    const {user,setUser,backendURL} = useContext(userDataContext);
    let handleSubmit=async (event)=>{
        event.preventDefault();
        const newUser={
            fullname:{
                firstname:Firstname,
                lastname:Lastname
            },
            email:Email,
            password:Password
        }

        const response = await axios.post(`${backendURL}/uber/user/register`,newUser);
        if(response.status === 200){
            const data = response.data;
            console.log(data);
            
            setUser({                                                                               //think something is missign
                fullname:{                                                                          //utbe code setUser(data.user)
                    firstname:data.data.fullname.firstname,
                    lastname:data.data.fullname.lastname
                },
                email:data.data.email

            })
            
            navigate('/user-login')
        }
        console.log(response)
        
    }
  return (
        <div className='p-5 flex h-screen flex-col justify-between'>
            <div>
                <img className='w-20 mb-7' src='https://download.logo.wine/logo/Uber/Uber-Logo.wine.png'></img>
                <form onSubmit={(event)=>handleSubmit(event)} >

                    <h3 className='my-2 text-lg  font-medium'>Enter your Firstame & Lastname</h3>
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
                    <h3 className='text-lg my-2 font-medium'>What's your email?</h3>
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
                    <button className='mt-4 w-full bg-black text-white px-3 py-2 rounded font-semibold'>Register</button>
                </form>
                <p className='text-center mt-3 font-medium'>Already have an account? <Link to='/user-login' className='text-blue-600'>Login</Link> </p>
            </div>
    
            <div>
                <p className='text-[8px] leading-tight text-gray-700'>By proceeding you consent to get Email,WhatsApp or SMS messages from Uber and it affiliates.Text "STOP" to 89203 to opt out.
                    This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.
                </p>
            </div>
        </div>
  )
}

export default UserSignup;
