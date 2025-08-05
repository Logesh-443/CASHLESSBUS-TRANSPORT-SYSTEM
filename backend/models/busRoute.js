//busRoute.js
const mongoose = require('mongoose')

const busRoutesSchema = new mongoose.Schema({
    
    busId:Number,
    busName:String,
    busRegNo:String,
    RouteId:Number,
    StopId:Number,
    StopName:String,
    Price:Number
})

const busRoutesModel = mongoose.model("busroutes", busRoutesSchema)
module.exports = busRoutesModel
