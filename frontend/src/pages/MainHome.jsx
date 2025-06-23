import React, { useContext, useEffect, useState } from "react";
import "remixicon/fonts/remixicon.css";
import "../../src/App.css";
import { useRef } from "react";
import gsap from "gsap";
import axios from "axios";
import { useGSAP } from "@gsap/react";
import LocationSuggestion from "../Component/LocationSuggestion";
import VehicleSelection from "../Component/VehicleSelection";
import ConformRide from "../Component/ConformRide";
import WaitingForDriver from "../Component/WaitingForDriver";
import DriverFound from "../Component/DriverFound";
import { userDataContext } from "../context/UserContext";
import {socketDataContext} from "../context/SocketContext";
import {useNavigate} from 'react-router-dom'
const MainHome = () => {
  const navigate = useNavigate()
  const [show, setShow] = useState(false);
  const [showVehicle,setVehicle] = useState(false);
  const [showConform,setShowConform] = useState(false)
  const [waitDriver,setWaitDriver] = useState(false)
  const panelRef = useRef(null);
  const secPanelRef = useRef(null);
  const arrowRef = useRef(null);
  const {user,setUser,backendURL} = useContext(userDataContext)

  // for inputs in main-home for origin and destination
  const[origin,setOrigin] = useState('');
  const[destination,setDestination] = useState('');
  //for suggestion array
  const [suggestions,setSuggestions]=useState([]);
  const[whichInput,setWhichInput] = useState('');

  //for fares to pass in the vehicle selection dynamically
  const [fares,setfares]=useState({})
  const[rideDetails,setRideDetails]=useState({})


  const [founded,setFounded]=useState(false)

  
  const handleChangeFunction = async (e) => {
    if(e.target.name === 'origin') {setOrigin(e.target.value);setWhichInput('origin');}
    if(e.target.name === 'destination'){setDestination(e.target.value);setWhichInput('destination');}
    
    if(e.target.value.trim() !=''){

      const response = await axios.get(`${backendURL}/maps/get-suggestions`,{
        params:{
          input:e.target.value,
        }
      })
      if(response.data){
        setSuggestions(response.data);
        
      }else{
        setSuggestions([]);
      }
      
    
    }else{
      setSuggestions([])
    }

  }
  

  useEffect(() => {
    if (show) {
      gsap.to(panelRef.current, {
        top: "0%",
      });
      gsap.to(secPanelRef.current, {
        height: "70%",
      });
      gsap.to(arrowRef.current, {
        opacity: 1,
      });
    } else {
      gsap.to(panelRef.current, {
        top: "70%",
      });
      gsap.to(secPanelRef.current, {
        height: "0%",
      });
      gsap.to(arrowRef.current, {
        opacity: 0,
      });
    }
  }, [show]);

  
  async function findTrip(){
    if(origin!='' && destination!=''){
      setVehicle(true)
    }
    try{
      
      const response = await axios.post(`${backendURL}/rides/get-fare`, {
        origin: origin,
        destination: destination
      });
      console.log(response.data);
      setfares(response.data);
      
    }catch(error){
      console.log(error);
      
    }
    
  }
  
  useEffect(() => {
    console.log("user in main home", user);
  }, [user]);
  const {socket} = useContext(socketDataContext);
  useEffect(() => {
    socket.emit('join',{userType:'user',userId:user?._id})
  },[user],[socket])


  const [rideConfirmedInfo,setRideConfirmedInfo]=useState({})
  socket.on('ride-confirmed',(data)=>{
    //console.log('data in main home',data);
    setRideConfirmedInfo(data);
    setFounded(true)
    setWaitDriver(false)
  })
  
  socket.on('ride-started',data=>{
    //console.log('ride-started-data0',data);
    navigate('/make-payment',{state:{rideStarted:data}});
  })

  return (
    <div className="flex flex-col justify-end bg-cover bg-center h-screen" style={{ backgroundImage: "url('/src/images/GoogleMapTA.webp')" }}>
      <img className="absolute top-0 w-20" src="https://download.logo.wine/logo/Uber/Uber-Logo.wine.png"></img>
      <div ref={panelRef} className="px-5 py-5 h-[30%] bg-white fixed z-20 bottom-0 ">
        <div>
          <h3 className="my-2 text-2xl  font-medium">Find a trip</h3>
          <h3 ref={arrowRef} onClick={() => {setShow(false);setOrigin('');setDestination('')}}>
            <i className=" absolute top-8 right-5 text-3xl ri-arrow-down-s-line"></i>
          </h3>

          <div className=" absolute top-[89px] left-8 rounded-full w-1 bg-gray-800 h-[60px]"></div>
          <input
            type="text"
            placeholder="   Add a pick-up location"
            required
            className="bg-[#eeeeee] w-full border py-2 px-3 rounded text-lg mb-4"
            name="origin"
            onClick={() => {
              setShow(true);
            }}
            onChange={handleChangeFunction}
            value={origin}
          />
          <input
            type="text"
            placeholder="   Enter your destination"
            required
            className="bg-[#eeeeee] w-full border py-2 px-3 rounded text-lg mb-4"
            name="destination"
            onClick={() => {
              setShow(true);
            }}
            onChange={handleChangeFunction}
            value={destination}
          />
          <button onClick={()=>{findTrip()}} 
            className="bg-black text-white font-semibold rounded-lg p-2 text-lg w-full ">Find a trip</button>
        </div>
      </div>
      <div ref={secPanelRef} className="bg-white fixed overflow-scroll bottom-0 h-[0%] w-full ">
        <div className="p-2 mt-6">
          <LocationSuggestion whichInput={whichInput} setVehicle={setVehicle} setOrigin={setOrigin}  setDestination={setDestination} setShowConform={setShowConform} suggestions={suggestions}></LocationSuggestion>
        </div>
      </div>

      {/* vehicle selection div */}
      <VehicleSelection 
        
        rideDetails={rideDetails}
        setRideDetails={setRideDetails}
          origin={origin} 
          destination={destination}
          fares={fares} 
          showVehicle={showVehicle} 
          setVehicle={setVehicle} 
          showConform={showConform} 
          setShowConform={setShowConform}>

      </VehicleSelection>

      {/* conform ride div */}
      <ConformRide  rideDetails={rideDetails} setRideDetails={setRideDetails} showConform={showConform} setShowConform={setShowConform} setWaitDriver={setWaitDriver}></ConformRide>

      {/* waiting for driver */}
      <WaitingForDriver rideDetails={rideDetails} waitDriver={waitDriver} setWaitDriver={setWaitDriver}></WaitingForDriver>

      {/* driver found page */}
      <DriverFound 
        setFounded={setFounded}
        rideConfirmedInfo={rideConfirmedInfo}
        founded={founded}>
      </DriverFound>

      
    </div>
  );
};

export default MainHome;
