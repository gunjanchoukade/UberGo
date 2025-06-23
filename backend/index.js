const express = require("express")
const app = express()
const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()
const router = require("./App/Routes/user.routes")
const capRouter = require("./App/Routes/captain.routes")
const cookie = require("cookie-parser")
const cookieParser = require("cookie-parser")
app.use(cookieParser())
app.use(express.json())
const cors = require('cors')
const mapRouter = require('./App/Routes/map.route')
const rideRouter = require('./App/Routes/ride.route')
const {Server} = require('socket.io')
const userModel = require('./App/Model/user.model')
const captainModel = require('./App/Model/captain.model')

const http = require('http')
app.use(cors())
app.use("/uber/user",router)
app.use("/uber/captain",capRouter)
app.use("/maps",mapRouter)
app.use("/rides",rideRouter)

app.get('/',(req,res)=>{
    res.send("UberGo base API working.")
})
const server = http.createServer(app)
const io = new Server(server,{
    cors:{
        origin:"*",
        methods:["GET","POST"]
    }
})

mongoose.connect(process.env.DB_URL).then(()=>{
    console.log("Connected to the Database");
    server.listen(process.env.PORT,()=>{
        console.log("server is running on port",process.env.PORT);
    })
}).catch((error)=>{
    console.log(error);
})

io.on('connection',(socket)=>{
    console.log("User connected",socket.id);
    socket.on('join', async (data) => {
        const { userType, userId } = data;
        if (userType === 'user') {
            await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
        }else if(userType === 'captain'){
            await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
        }
    });
    socket.on('update-location-captain', async (data) => {
        const { userId, location } = data;
        console.log("Captain location",location);
        if (!location || !location.ltd || !location.lng) {
            return socket.emit('error', { message: 'Invalid location data' });
        }

        await captainModel.findByIdAndUpdate(userId, {
            location: {
                ltd: location.ltd,
                lng: location.lng
            }
        });
    });
   
});

module.exports.sendMessageToSocketId=(socketId, messageObject) =>{

   
    console.log('message object',messageObject)
    if (io) {
        io.to(socketId).emit(messageObject.event, messageObject.data);
    } else {
        console.log('Socket.io not initialized.');
    }
}


    
