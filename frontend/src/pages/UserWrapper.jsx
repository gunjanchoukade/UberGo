import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { userDataContext } from '../context/UserContext';

const UserWrapper =  ({children}) => {

    const {user,setUser,backendURL} = useContext(userDataContext)
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    useEffect(  ()=>{
      if(!token){
        navigate('/user-login');
      }
      
      const fecthUser = async()=>{
        try{
          const response = await axios.get(`${backendURL}/uber/user/profile`,{
            headers:{
              Authorization: `Bearer ${token}`
            }
          })
          if(response.status === 200){
            setUser(response.data.user)
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

export default UserWrapper
