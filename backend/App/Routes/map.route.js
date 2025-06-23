const express = require('express')
const mapRouter = express.Router()
const mapServices = require('../Services/map.services')
const mapController = require('../Controller/map.controller')
const {query} = require('express-validator')

mapRouter.get('/getCoordinates',
    query('address').isString().isLength({min:3}),
    mapController.getCoordinates
)
mapRouter.get('/get-distance-time',mapController.getDistanceTime)

mapRouter.get('/get-suggestions',query('input').isString().isLength({min:3}),mapController.showSuggestion)
module.exports=mapRouter;