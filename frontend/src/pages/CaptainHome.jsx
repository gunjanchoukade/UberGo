import React, { useContext } from "react";
import RideOptionForDriver from "../Component/RideOptionForDriver";
import RideConfirmOrDelete from "../Component/RideConfirmOrDelete";
import { useState, useEffect } from "react";
import { captainDataContext } from "../context/CaptainContext";
import { socketDataContext } from "../context/SocketContext";
import axios from "axios";
import RideStarted from "./RideStarted";
import { userDataContext } from "../context/UserContext";
import GoogleMapTA from "../images/GoogleMapTA.jpeg"
const CaptainHome = () => {
  let [confirm, setConfirm] = useState(false);
  let [showNewRide, setShownewRide] = useState(false); //ride available ppup
  const [passenger,setPassenger] = useState({});
  const { socket } = useContext(socketDataContext);
  const { captain, setCaptain } = useContext(captainDataContext);
  // useEffect(() => {
  //   console.log("Captain data in CaptainHome:", captain);
  // }, [captain]);

  const {backendURL} = useContext(userDataContext)
 
  useEffect(() => {
    socket.emit("join", { userType: "captain", userId: captain?._id });

    const updateLocation = () => {
      //this is provided by vs code if want can study little bit
      if (navigator.geolocation) {
        console.log("update liaction function is called");
        navigator.geolocation.getCurrentPosition((position) => {
          // console.log("hi",position.coords.latitude,position.coords.longitude)
          socket.emit("update-location-captain", {
            userId: captain._id,
            location: {
              ltd: position.coords.latitude,
              lng: position.coords.longitude,
            }, 
          });
         
        });
      }
    };

    const locationInterval = setInterval(updateLocation, 60000);
    locationInterval 
  },);

  socket.on('new-ride', (data) => {
   
    setPassenger(data);
    setShownewRide(true);
  })

  
  async function ConfirmRide(){
    const response = await axios.post(`${backendURL}/rides/confirm`,{
      rideId:passenger[0]._id,
    },{
      headers:{
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })//
    
    

  };
  
  useEffect(()=>{
    console.log('captain in home',captain)
  })
  return (
    <div>
      <div
        className="flex   fixed w-full flex-col justify-end bg-cover bg-center h-screen"
        style={{ backgroundImage: `url(${GoogleMapTA})` }}
      >
        <img
          className="absolute top-0 w-20"
          src="https://download.logo.wine/logo/Uber/Uber-Logo.wine.png"
        ></img>

        <div className=" bg-white rounded-xl p-3 pt-8 flex flex-col justify-between">
          {" "}
          {/*white color div*/}
          <div className="flex justify-between items-center">
            <div className="flex  w-full items-center">
              {" "}
              {/*photo and name */}
              <img
                className="rounded-full h-12 w-12 object-cover"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdlMd7stpWUCmjpfRjUsQ72xSWikidbgaI1w&s"
              ></img>
              <h2 className="ml-2 font-medium text-lg uppercase text-gray-600">
                 { captain?.fullname.firstname + " " + captain?.fullname.lastname} 
              </h2>
            </div>

            <div className="leading-tight">
              <h1 className="text-xl font-semibold"> ₹2925.28</h1>
              <p className="text-sm ml-2 -mt-1 text-gray-500">Earned</p>
            </div>
          </div>
          <div className="w-full mt-5 mb-5 bg-gray-200 p-3 rounded-xl flex justify-evenly">
            <div className="leading-tight text-center justify-center">
              <i className="ri-time-line text-4xl font-semibold"></i>
              <h2 className="font-semibold">10.2</h2>
              <p className="text-xs text-gray-500">HOURS ONLINE</p>
            </div>
            <div className="leading-tight text-center justify-center">
              <i class="ri-speed-up-line text-4xl font-semibold"></i>
              <h2 className="font-semibold">110.2Km</h2>
              <p className="text-xs text-gray-500">TOTAL DISTANCE</p>
            </div>
            <div className="leading-tight text-center justify-center">
              <i class="ri-booklet-line text-4xl font-semibold"></i>
              <h2 className="font-semibold">10.2</h2>
              <p className="text-xs text-gray-500">TOTAL RIDES</p>
            </div>
          </div>
        </div>
      </div>
      {/* ride available pop-up */}
      <RideOptionForDriver
        passenger={passenger}
        setConfirm={setConfirm}
        showNewRide={showNewRide}
        setShownewRide={setShownewRide}
        ConfirmRide={ConfirmRide}
      ></RideOptionForDriver>

      {/* confirm or delete */}
      <RideConfirmOrDelete
        passenger={passenger}
        confirm={confirm}
        setConfirm={setConfirm}
        setShownewRide={setShownewRide}
      ></RideConfirmOrDelete>

      {/* final ride page */}
      {/* <RideStarted passenger={passenger}></RideStarted> */}
      
      
    </div>

    
  );
};

export default CaptainHome;
