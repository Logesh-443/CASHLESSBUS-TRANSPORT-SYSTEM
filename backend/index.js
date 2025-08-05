const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const busDetailsModel = require('./models/busDetail')
const busRoutesModel = require('./models/busRoute')
const userDetailsModel = require('./models/users')
const cardDetailsModel = require('./models/cardRecharge')
const driverDetailsModel = require('./models/driverDetail')
const adminDetailsModel = require('./models/admin')
const entryDetailsModel = require('./models/entry')

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://localhost:27017/transport")

//admin login
app.post('/postadmindetails', (req, res) => {
    const { username, password } = req.body;
    adminDetailsModel.findOne({ username })
        .then(admindetails => {      
            if (admindetails.password == password) {
                res.json("success")
            } else {
                res.json("Failed")
            }
        }).catch(err => res.json(err))
})

//bus details
app.get('/getbusdetails', (req, res) => {
    busDetailsModel.find()
        .then(busdetails => res.json(busdetails))
        .catch(err => res.json(err))
})
app.get('/getbusdetails/getbusId', (req, res) => {
    busDetailsModel.findOne({}, { busId: 1 }).sort({ busId: -1 })
        .then(busdetails => {
            if (busdetails) {
                res.json({ busdetails })
            }
            else {
                res.json({ busdetails: { _id: 0, busId: 0 } })
            }
        })
        .catch(err => res.json(err))
})
app.get('/getbusById/:id', (req, res) => {
    const id = req.params.id;
    busDetailsModel.findById({ _id: id })
        .then(busdetails => res.json({ busdetails }))
        .catch(err => res.json(err));
})
app.post('/postbusdetails', (req, res) => {
    busDetailsModel.create(req.body)
        .then(busdetails => res.json(busdetails))
        .catch(err => res.json(err))
})
app.put('/putbusdetails/:id', (req, res) => {
    try {
        const bid = req.params.id;
        busDetailsModel.findByIdAndUpdate({ _id: bid }, {
            id: req.body.id, busName: req.body.busName,
            busNo: req.body.busNo, registrationNo: req.body.registrationNo, source: req.body.source,
            destination: req.body.destination
        })
            .then(busdetails => {
                res.json(busdetails);
                console.log(busdetails)
            })
            .catch(err => res.json(err))
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ error: error })
    }
})
app.delete('/deletebusdetails/:id', (req, res) => {
    const bid = req.params.id;
    busDetailsModel.findByIdAndDelete({ _id: bid })
        .then(busdetails => {
            res.json(busdetails);
            console.log(busdetails)
        })
        .catch(err => res.json(err))
})

//bus routes
app.get('/getbusRoutes', (req, res) => {
    busRoutesModel.find()
        .then(busroutes => res.json(busroutes))
        .catch(err => res.json(err))
})
app.get('/getbusRoutes/getRouteId', (req, res) => {
    busRoutesModel.findOne({}, { RouteId: 1 }).sort({ RouteId: -1 })
        .then(busroutes => {
            if (busroutes) {
                res.json({ busroutes })
            }
            else {
                res.json({ busroutes: { _id: 0, RouteId: 0 } })
            }
        })
        .catch(err => res.json(err))
})
app.get('/getbusRoutes/getStopId/:busId', (req, res) => {
    const busId = req.params.busId
    busRoutesModel.findOne({ busId: busId }, { StopId: 1 }).sort({ StopId: -1 })
        .then(
            busroutes => {
                if (busroutes) {
                    res.json({ busroutes })
                }
                else {
                    res.json({ busroutes: { _id: 0, StopId: 0 } })
                }
            })
        .catch(err => res.json(err));
})
app.get('/getRouteById/:id', (req, res) => {
    const id = req.params.id;
    busRoutesModel.findById({ _id: id })
        .then(busroutes => res.json({ busroutes }))
        .catch(err => res.json(err));
})
app.post('/postbusRoutes', (req, res) => {
    try {
        busRoutesModel.create({
            busId: req.body.busId, busName: req.body.busName, busRegNo: req.body.busRegNo, RouteId: req.body.RouteId,
            StopId: req.body.StopId, StopName: req.body.StopName, Price: req.body.Price
        })
            .then(busroutes => res.json(busroutes))
            .catch(err => res.json(err))
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ error: err })
    }
})
app.put('/putbusRoutes/:id', (req, res) => {
    const bid = req.params.id;
    busRoutesModel.findByIdAndUpdate({ _id: bid }, {
        busId: req.body.busId, busName: req.body.busName, busRegNo: req.body.busRegNo, RouteId: req.body.RouteId,
        StopId: req.body.StopId, StopName: req.body.StopName, Price: req.body.Price
    })
        .then(busroutes => {
            res.json(busroutes);
        })
        .catch(err => res.json(err))
})
app.delete('/deletebusRoutes/:id', (req, res) => {
    const bid = req.params.id;
    busRoutesModel.findByIdAndDelete({ _id: bid })
        .then(busroutes => {
            res.json(busroutes);
            console.log(busroutes)
        })
        .catch(err => res.json(err))
})

//user details
app.get('/getuserDetails', (req, res) => {
    userDetailsModel.find()
        .then(userDetails => res.json(userDetails))
        .catch(err => res.json(err))
})
app.get('/getuserDetails/getuserId', (req, res) => {
    userDetailsModel.findOne({}, { userId: 1 }).sort({ userId: -1 })
        .then(userDetails => {
            if (userDetails) {
                res.json({ userDetails })
            }
            else {
                res.json({ userDetails: { _id: 0, userId: 0 } })
            }
        })
        .catch(err => res.json(err))
})
app.get('/getuserById/:id', (req, res) => {
    const id = req.params.id;
    userDetailsModel.findById({ _id: id })
        .then(userDetails =>{
            res.json( userDetails )
            console.log(userDetails)
        } )
        .catch(err =>{
            console.log(err)
            res.json(err)
        } );
})
app.post('/postuserDetails', (req, res) => {

    userDetailsModel.create(req.body)
        .then(userDetails => res.json(userDetails))
        .catch(err => res.json(err))
})
app.put('/putuserDetails/:id', (req, res) => {
    try {
        const bid = req.params.id;
        userDetailsModel.findByIdAndUpdate({ _id: bid }, {
            userId: req.body.userId, userName: req.body.userName,
            userMobileNo: req.body.userMobileNo, userMail: req.body.userMail, cardNo: req.body.cardNo,
            cardBalance: req.body.cardBalance
        })
            .then(userDetails => {
                res.json(userDetails);
            })
            .catch(err => res.json(err))
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ error: error })
    }
})
app.delete('/deleteuserDetails/:id', (req, res) => {
    const bid = req.params.id;
    userDetailsModel.findByIdAndDelete({ _id: bid })
        .then(userDetails => {
            res.json(userDetails);
            console.log(userDetails)
        })
        .catch(err => res.json(err))
})

//card details
app.get('/getcardDetails', (req, res) => {
    cardDetailsModel.find()
        .then(cardDetails => res.json(cardDetails))
        .catch(err => res.json(err))
})
app.get('/getcardDetails/getcardRechargeId', (req, res) => {
    cardDetailsModel.findOne({}, { cardRechargeId: 1 }).sort({ cardRechargeId: -1 })
        .then(cardDetails => {
            if (cardDetails) {
                res.json({ cardDetails })
            }
            else {
                res.json({ cardDetails: { _id: 0, cardRechargeId: 0 } })
            }
        })
        .catch(err => res.json(err))
})
app.get('/getcardById/:id', (req, res) => {
    const id = req.params.id;
    cardDetailsModel.findById({ _id: id })
        .then(cardDetails => res.json({ cardDetails }))
        .catch(err => res.json(err));
})
app.post('/postcardDetails', (req, res) => {
    cardDetailsModel.create(req.body)
        .then(cardDetails => res.json(cardDetails))
        .catch(err => res.json(err))
})
app.put('/putcardDetails/:id', (req, res) => {
    const bid = req.params.id;
    cardDetailsModel.findByIdAndUpdate({ _id: bid }, {
        cardRechargeId: req.body.cardRechargeId, userId: req.body.userId, cardHolder: req.body.cardHolder, cardNo: req.body.cardNo,
        currentBalance: req.body.currentBalance, rechargeAmount: req.body.rechargeAmount, cardBalance: req.body.cardBalance
    })
        .then(cardDetails => {
            res.json(cardDetails);
        })
        .catch(err => res.json(err))
})
app.put('/putuserCardbalance/:id', (req, res) => {
    const bid = req.params.id;
    userDetailsModel.findByIdAndUpdate({ _id: bid }, { cardBalance: req.body.cardBalance })
        .then(userDetails => {
            res.json(userDetails);
        })
        .catch(err => {
            res.json(err)
            console.log(err)
        })
})
app.delete('/deletecardDetails/:id', (req, res) => {
    const bid = req.params.id;
    cardDetailsModel.findByIdAndDelete({ _id: bid })
        .then(cardDetails => {
            res.json(cardDetails);
        })
        .catch(err => res.json(err))
})

//driver details
app.get('/getdriverdetails', (req, res) => {
    driverDetailsModel.find()
        .then(driverdetails => res.json(driverdetails))
        .catch(err => res.json(err))
})
app.get('/getdriverdetails/getdriverId', (req, res) => {
    driverDetailsModel.findOne({}, { driverId: 1 }).sort({ driverId: -1 })
        .then(driverdetails => {
            if (driverdetails) {
                res.json({ driverdetails })
            }
            else {
                res.json({ driverdetails: { _id: 0, driverId: 0 } })
            }
        })
        .catch(err => res.json(err))
})
app.get('/getdriverById/:id', (req, res) => {
    const id = req.params.id;
    driverDetailsModel.findById({ _id: id })
        .then(driverdetails => res.json({ driverdetails }))
        .catch(err => res.json(err));
})
app.post('/postdriverdetails', (req, res) => {

    driverDetailsModel.create(req.body)
        .then(driverdetails => res.json(driverdetails))
        .catch(err => res.json(err))
})
app.put('/putdriverdetails/:id', (req, res) => {
    const bid = req.params.id;
    driverDetailsModel.findByIdAndUpdate({ _id: bid }, {
        driverId: req.body.driverId, driverName: req.body.driverName,
        driverMobileNo: req.body.driverMobileNo, licenseNo: req.body.licenseNo, password: req.body.password
    })
        .then(driverdetails => {
            res.json(driverdetails);
        })
        .catch(err => res.json(err))
})
app.delete('/deletedriverdetails/:id', (req, res) => {
    const bid = req.params.id;
    driverDetailsModel.findByIdAndDelete({ _id: bid })
        .then(driverdetails => {
            res.json(driverdetails);
            console.log(driverdetails)
        })
        .catch(err => res.json(err))
})

//entry details
app.get('/getentrydetails/getentryId', (req, res) => {
    entryDetailsModel.findOne({}, { entryId: 1 }).sort({ entryId: -1 })
        .then(entrydetails => {
            if (entrydetails) {
                res.json({ entrydetails })
            }
            else {
                res.json({ entrydetails: { _id: 0, entryId: 0 } })
            }
        })
        .catch(err => res.json(err))
})
app.get('/getentryById/:id', (req, res) => {
    const id = req.params.id;
    entryDetailsModel.findById({ _id: id })
        .then(entrydetails => res.json({ entrydetails }))
        .catch(err => res.json(err));
})
app.post('/postentrydetails', (req, res) => {
    const {driverId}=req.body
    console.log(driverId)
    entryDetailsModel.find({Status:"Active",driverId:driverId})
        .then(entrydetails => {
            console.log(entrydetails)
            res.json(entrydetails)
        })
        .catch(err =>{console.log(err)
             res.json(err)})
})
app.post('/postcheckentrydetails',(req,res)=>{
    const {cardId,Status}=req.body
    entryDetailsModel.findOne({ cardId: cardId, Status: Status })
    .then(card => {
      res.json(card)
    })
    .catch(err => {
      console.error('Error finding card:', err);
    });
})
app.post('/postentrybusId', (req, res) => {
    const {busId} = req.body;
    busRoutesModel.find( { busId: busId })
        .then(busroutes => {
            res.json(busroutes)
        })
        .catch(err => {
            res.json(err)
        })
})
app.post('/postentrycardId', (req, res) => {
    const cardNo = req.body.cardNo;
    userDetailsModel.findOne( { cardNo: cardNo })
        .then(userDetails => {
            res.json(userDetails)
        })
        .catch(err => {
            res.json(err)
        })
})
app.post('/postnewentrydetails', (req, res) => {

    entryDetailsModel.create(req.body)
        .then(entrydetails => {
            res.json(entrydetails)
            console.log(entrydetails)
        })
        .catch(err => res.json(err))
})
app.post('/postbusByBusId', (req, res) => {
    busRoutesModel.distinct('busId')
        .then(busroutes => {           
            const ids=busroutes;
            busDetailsModel.find({ busId: { $in: ids } })
                .then((busdetails) => {
                     res.json(busdetails);
                })
                .catch(err => {
                    res.json(err);
                });
        });
})
app.post('/postbusRouteByBusId', (req, res) => {
    const busId = req.body.busId;
    busRoutesModel.find({ busId: { $in: busId } })
        .then(busroutes => {
            res.json(busroutes);
        })
        .catch(err => {
            res.json(err)
        })
})
app.post('/postbusRouteById', (req, res) => {
    const RouteId = req.body.RouteId;
    busRoutesModel.findOne({ RouteId: { $in: RouteId } })
        .then(busroutes => {
            res.json(busroutes);
        })
        .catch(err => {
            res.json(err)
        })
})
app.put('/putentrydetails/:id', (req, res) => {
    const bid = req.params.id;
    entryDetailsModel.findByIdAndUpdate({ _id: bid }, { ERouteId:req.body.ERouteId,ExitTime: req.body.ExitTime,
        ExitStopId: req.body.ExitStopId, Amount: req.body.Amount,Status: req.body.Status
    },{new:true})
        .then(entrydetails => {
            res.json(entrydetails);
        })
        .catch(err => res.json(err))
})
app.put('/putuserBalance/:id', (req, res) => {
    try {
        const bid = req.params.id;
        userDetailsModel.findByIdAndUpdate({ _id: bid }, {
            cardBalance: req.body.cardBalance
        })
            .then(userDetails => {
                res.json(userDetails);
            })
            .catch(err => res.json(err))
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ error: error })
    }
})

//driver login
app.post('/postdriverlogin', (req, res) => {
    const { driverMobileNo, password } = req.body;
    driverDetailsModel.findOne({ driverMobileNo })
        .then(user => {
            if (user.password == password) {
                res.json("success")
            } else {
                res.json("Failed")
            }
        }).catch(err => res.json(err))
})

app.listen(3001, () => {
    console.log("server connected")
})