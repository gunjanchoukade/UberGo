import { useState } from 'react'
import "./index.css"
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import UserLogin from './pages/UserLogin'
import UserSignup from "./pages/UserSignup"
import CaptainSignup from './pages/CaptainSignup'
import CaptainLogin from './pages/CaptainLogin'
import MainHome from './pages/MainHome'
import UserWrapper from './pages/UserWrapper'
import CaptainWrapper from './pages/CaptainWrapper'
import CaptainHome from './pages/CaptainHome'
import RideStarted from './pages/RideStarted'
import CaptainContext from './context/CaptainContext'
import MakePayment from './pages/MakePayment'
function App() {
  

  return (
    <div>
      
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/user-login' element={<UserLogin></UserLogin>}></Route>
        <Route path='/make-payment' element={<MakePayment></MakePayment>}></Route>
        <Route path='/ride-started' element={<RideStarted></RideStarted>}> </Route>
        <Route path='/user-signup' element={<UserSignup></UserSignup>}></Route>
        <Route path='/captain-signup' element={<CaptainSignup></CaptainSignup>}></Route>
        <Route path='/captain-home' element={<CaptainWrapper><CaptainHome></CaptainHome></CaptainWrapper>}></Route>
        <Route path='/captain-login' element={<CaptainLogin></CaptainLogin>}></Route>
        <Route path='/main-home' element={<UserWrapper><MainHome/></UserWrapper>}></Route>
        
      </Routes>
      
    </div>
  )
}

export default App
