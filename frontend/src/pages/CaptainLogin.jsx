import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { captainDataContext } from '../context/CaptainContext'
import { userDataContext } from '../context/UserContext'
const CaptainLogin = () => {
    
    const navigate = useNavigate()
    const {backendURL} = useContext(userDataContext)
    let[captainData,setcaptainData]=useState({
            email:'',
            password:''
        })
        let handleChange=(event)=>{
            let inputName = event.target.name;
            let inputValue = event.target.value;
    
            let oldData = {...captainData}
            oldData[inputName]=inputValue
            setcaptainData(oldData);
        }
        let handleSubmit=async (event)=>{
            event.preventDefault();
            const response = await axios.post(`${backendURL}/uber/captain/login`,captainData);
            if(response.status===200){
                
                localStorage.setItem('token',response.data.captainToken.token);
                navigate('/captain-home')
            }
            
        }
  return (
    <div className='p-5 flex h-screen flex-col justify-between'>
            <div>
                <img className='w-20 mb-7' src='https://download.logo.wine/logo/Uber/Uber-Logo.wine.png'></img>
                <form onSubmit={(event)=>handleSubmit(event)} >
                    <h3 className='text-lg my-2 font-medium'>What's your email?</h3>
                    <input  onChange={handleChange}
                    type='email' 
                    placeholder='Enter your email'
                    required
                    className='bg-[#eeeeee] w-full border py-2 px-3 rounded text-lg mb-4'
                    name='email'
                    value={captainData.email}
                    />
    
                    <h3 className='my-2 text-lg  font-medium'>Enter password</h3>
                    <input onChange={handleChange}
                    type='password' 
                    required
                    placeholder='password'
                    className='bg-[#eeeeee] w-full border py-2 px-3 rounded text-lg mb-4'
                    name='password'
                    value={captainData.password}
                    />
                    <button className='mt-4 w-full bg-black text-white px-3 py-2 rounded font-semibold'>Login</button>
                </form>
                <p className='text-center mt-3 font-medium'>Join a fleet? <Link to='/captain-signup' className='text-blue-600'>Register as Captain</Link> </p>
            </div>
    
            <div>
                <Link to='/user-login' className='flex  justify-center items-center mt-4 w-full bg-green-500 text-white px-3 py-2 rounded font-semibold'>Sign in as User</Link>
            </div>
        </div>
  )
}

export default CaptainLogin
