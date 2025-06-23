import React from 'react'
import { useState,createContext } from 'react'


export const userDataContext = createContext()

const UserContext = ({children}) => {
    const backendURL = import.meta.env.VITE_backendURL
    const [user,setUser]=useState({
        fullname:{
            firstname:'',
            lastname:'' 
        },
        email:''
    })
    return (
        <div>
            <userDataContext.Provider value={{user,setUser,backendURL}}>
                {children}
            </userDataContext.Provider>
        </div>
    )
}

export default UserContext
