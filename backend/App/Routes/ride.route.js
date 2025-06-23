const express = require('express')
const {body} = require('express-validator')
const rideRouter = express.Router()
const userMiddleware = require('../Middleware/user.middleware')
const rideController = require('../Controller/ride.controller')
const captainMiddleware = require('../Middleware/captain.middleware')



rideRouter.post('/create',userMiddleware.userLoginMiddleware,
    
    body('origin').isString().isLength({min: 3}).withMessage('Invalid Origin'),
    body('destination').isString().isLength({min: 3}).withMessage('Invalid Destination'),
    body('vehicleType').isString().isIn(['auto','car','motorcycle']).withMessage('Invalid Vehicle Type'),
    rideController.creatingRide


)

rideRouter.post('/get-fare',rideController.rideFares)


rideRouter.post('/confirm',captainMiddleware.captainLoginMiddleware,rideController.confirmRide)

rideRouter.get('/ride-started',captainMiddleware.captainLoginMiddleware,rideController.startRide)

rideRouter.post('/ride-end',captainMiddleware.captainLoginMiddleware,rideController.endRide)

module.exports=rideRouter