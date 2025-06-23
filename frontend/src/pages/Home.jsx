import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className='flex flex-col justify-between h-screen w-full bg-red-400 bg-cover bg-center'
    style={{ backgroundImage: "url('/src/images/start.jpeg')" }}>
        <div>
            <img className='w-20' src='https://download.logo.wine/logo/Uber/Uber-Logo.wine.png'></img>
            
        </div>
        <div className='bg-white py-3 px-3'>
            <h3 className='mb-5  text-2xl font-bold'>Get Started With Uber</h3>
            <Link to='/user-login' className='flex justify-center items-center text-2xl bg-black text-white w-full py-3 rounded my-4  '>Continue</Link>
        </div>
      
    </div>
  )
}

export default Home
