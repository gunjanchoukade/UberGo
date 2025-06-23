import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from "axios"
import {userDataContext} from "../context/UserContext"

const UserLogin = () => {
    let[loginData,setLoginData]=useState({
        email:'',
        password:''
    })
    let handleChange=(event)=>{
        let inputName = event.target.name;
        let inputValue = event.target.value;

        let oldData = {...loginData}
        oldData[inputName]=inputValue
        setLoginData(oldData);
    }
    const {user,setUser,backendURL} = useContext(userDataContext)
    const navigate = useNavigate()
    let handleSubmit=async (event)=>{
        event.preventDefault();
        const response = await axios.post(`${backendURL}/uber/user/login`,loginData);
        if(response.status === 200){
            const data = response.data;
            console.log('data',data)
            setUser(data.data);
            localStorage.setItem('token',data.token)
            navigate('/main-home')

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
                value={loginData.email}
                />

                <h3 className='my-2 text-lg  font-medium'>Enter password</h3>
                <input onChange={handleChange}
                type='password' 
                required
                placeholder='password'
                className='bg-[#eeeeee] w-full border py-2 px-3 rounded text-lg mb-4'
                name='password'
                value={loginData.password}
                />
                <button className='mt-4 w-full bg-black text-white px-3 py-2 rounded font-semibold'>Login</button>
            </form>
            <p className='text-center mt-3 font-medium'>New here? <Link to='/user-signup' className='text-blue-600'>Create new account</Link> </p>
        </div>

        <div>
            <Link to='/captain-login' className='flex  justify-center items-center mt-4 w-full bg-green-500 text-white px-3 py-2 rounded font-semibold'>Sign in as Captain</Link>
        </div>
    </div>
  )
}

export default UserLogin
