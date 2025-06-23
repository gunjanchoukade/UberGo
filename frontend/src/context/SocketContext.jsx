import React, { Children } from 'react'
import { createContext } from 'react'
import { io } from 'socket.io-client'

export const socketDataContext = createContext()
const backendURL = import.meta.env.VITE_backendURL

const socket = io(`${backendURL}`, {
  transports: ["websocket"], // force WebSocket transport
})
const SocketContext = ({children}) => {
  return (
    <div>
        <socketDataContext.Provider value={{socket,backendURL}}>
            {children}
        </socketDataContext.Provider>
    </div>
  )
}

export default SocketContext
