import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { captainDataContext } from '../context/CaptainContext';
import { userDataContext } from '../context/UserContext';


const CaptainWrapper =  ({children}) => {

    const {captain,setCaptain} = useContext(captainDataContext);
    const navigate = useNavigate();
    const {backendURL} = useContext(userDataContext)
    const token = localStorage.getItem('token');
    useEffect(  ()=>{
      if(!token){
        navigate('/captain-login');
      }
      
      const fecthUser = async()=>{
        try{
          const response = await axios.get(`${backendURL}/uber/captain/profile`,{
            headers:{
              Authorization: `Bearer ${token}`
            }
          })
          if(response.status === 200){
            
            
            setCaptain(response.data.user)
          }
        }catch(error)
        {
          console.log(error)
        }
      }
      if(token){
        fecthUser();
      }
    },[token])
  return (
    <div>

      {children}
    </div>
  )
}

export default CaptainWrapper
