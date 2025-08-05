import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router';
import Header from './Header';
import DriverHeader from './DriverHeader';

const EntryDetails = (state) => {

    const location = useLocation();
    const [entryId, setEntryId] = useState(0);
    const [cardId, setCardId] = useState(0);
    const [BusNo, setBusNo] = useState(0);
    const [EntryStopId, setEntryStopId] = useState(0);
    const [ExitStopId, setExitStopId] = useState(0);
    const [Amount, setAmount] = useState(0);
    const [Status, setStatus] = useState('Active');
    const [driverId, setDriverId] = useState(location.state);
    const [_id, set_id] = useState(0);
    const [RouteId, setRouteId] = useState(0);
    const [userId, setUserId] = useState(0)
    const [maxRouteId, setmaxRouteId] = useState(0);
    const [cardHolder, setCardHolder] = useState('');
    const [currentBalance, setCurrentBalance] = useState(0);
    const [EntryTime, setEntryTime] = useState(new Date());
    const [ExitTime, setExitTime] = useState(new Date());
    const [userDetails, setuserDetails] = useState([])
    const [busdetails, setBusDetails] = useState([])
    const [routedetails, setRouteDetails] = useState([])
    const [formErrors, setFormErrors] = useState([]);
    const [stopErrors, setStopErrors] = useState([]);
    const navigate = new useNavigate();

    const findName = (bid) => {
        axios.get('http://localhost:3001/getuserById/' + bid).then((res) => {
            setCardHolder(res.data.userName)
            setCurrentBalance(res.data.cardBalance)
            setCardId(res.data.cardNo)
            setUserId(res.data._id)
        }).catch((error) => {
            console.log(error);
        });
    };
    const findBus = (busId) => {
        setBusNo(busId)
        axios.post('http://localhost:3001/postbusRouteByBusId',
            { busId }).then((resp) => {
                setRouteDetails(resp.data);
                setRouteId(resp.RouteId);
                //setBusNo(resp.busId)
                getMaxId(busId)
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const getMaxId = (busId) => {
        axios.get('http://localhost:3001/getbusRoutes/getStopId/' +
            busId).then((resp) => {
                setmaxRouteId(resp.data.busroutes.StopId);
            })
            .catch((error) => 
                console.log(error)
            );
    }
    const findRoute = (RouteId) => {
        setRouteId(RouteId)
        axios.post('http://localhost:3001/postbusRouteById',
            { RouteId }).then((resp) => {

                setEntryStopId(resp.data.StopId)
                setExitStopId(resp.data.StopId)
            })
            .catch((error) => {
                console.log(error);
            });
    }
    const handleAdd = () => {
        console.log(driverId)
        if(driverId){
        if (userId.length !== 0 && currentBalance !== 0 && cardHolder.length !== 0 &&
            EntryTime.toLocaleString().trim().length !== 0 && RouteId !== 0) {
            if (currentBalance >= 10) {
                fetchEntryData();
                axios.post('http://localhost:3001/postcheckentrydetails', { cardId, Status })
                    .then(async (res) => {
                        if (res.data && Object.keys(res.data).length > 0) {
                            set_id(res.data._id);
                            const stp1 = res.data.EntryStopId;
                            const SRouteId = res.data.SRouteId;
                            const cardNo = res.data.cardId;
                            if (res.data.BusNo === BusNo && res.data.cardId === cardId) {
                                if (stp1 < ExitStopId) {
                                    const Status = "InActive";
                                    const ERouteId = RouteId;
                                    const Amt = calAmount(SRouteId, ERouteId)
                                    const promise = Promise.resolve(Amt);
                                    const Amount = await promise;
                                    axios.put('http://localhost:3001/putentrydetails/' + res.data._id, { ERouteId, ExitTime, ExitStopId, Amount, Status })
                                        .then((response) => {
                                            axios.post('http://localhost:3001/postentrycardId', { cardNo })
                                                .then((resp) => {
                                                    const id = resp.data._id
                                                    axios.get('http://localhost:3001/getuserById/' + id)
                                                        .then((res) => {
                                                            const id = res.data._id;
                                                            const bal = res.data.cardBalance;
                                                            const cardBalance = bal - Amount;
                                                            axios.put('http://localhost:3001/putuserBalance/' + id, { cardBalance })
                                                                .then((cres) => console.log(cres))
                                                                .catch((err) => {
                                                                    console.log(err);
                                                                });
                                                        })
                                                        .catch((err) => {
                                                            console.log(err);
                                                        });
                                                    console.log(response.data, "submitted");
                                                    navigate('/viewentry', { state: driverId })
                                                })
                                                .catch((err) => {
                                                    console.log(err);
                                                });
                                        }).catch((err) => {
                                            console.log(err);
                                        });
                                }
                                else {
                                    setStopErrors("Exit stop should be not same as entry stop")
                                }
                            } else {
                                setStopErrors("select same bus")
                            }
                        }
                        else {
                            const ExitStopId = "";
                            const Amount = 0;
                            const SRouteId = RouteId;
                            const ERouteId = 0;
                            console.log(EntryStopId + " " + maxRouteId)
                            if (EntryStopId < maxRouteId) {
                                axios.post('http://localhost:3001/postnewentrydetails', { entryId, driverId, cardId, cardHolder, BusNo, SRouteId, ERouteId, EntryTime, EntryStopId, ExitTime, ExitStopId, Amount, Status })
                                    .then((result) => {
                                        console.log(result.data, "submitted");
                                        navigate('/viewentry', { state: driverId })
                                    })
                                    .catch((err) => {
                                        console.log(err);
                                    });
                            }
                            else {
                                setStopErrors("Entry stop should not be the destination stop")
                            }
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
            else {
                setFormErrors({ ...formErrors, currentBalance: "Card Balance is too low please recharge" })
            }
        }
        else {
            console.log("Enter all required fields");
        }}
        else{
            alert("Something went wrong login again");
        }
    }
    const calAmount = async (s, e) => {
        var RouteId = s;
        const s1 = axios.post('http://localhost:3001/postbusRouteById',
            { RouteId }).then((resp) => resp.data.Price)
            .catch((error) => {
                console.log(error);
            });
        RouteId = e;
        const e1 = axios.post('http://localhost:3001/postbusRouteById',
            { RouteId }).then((resp) => resp.data.Price)
            .catch((error) => {
                console.log(error);
            });
        const promise1 = Promise.resolve(s1);
        const promise2 = Promise.resolve(e1);
        const result1 = await promise1;
        const result2 = await promise2;
        const difference = result2 - result1;
        setAmount(difference);
        return (difference)
    }
    const handleCancel = () => {
        navigate('/viewentry', { state: driverId })
    }
    const handleClear = () => {
        setRouteDetails([]);
        setCardId(0);
        setBusNo(0);
        setEntryStopId(0);
        setExitStopId(0);
        setAmount(0);
        setStatus('Active');
        set_id(0);
        setRouteId(0);
        setUserId(0)
        setCardHolder('');
        setCurrentBalance(0);
        setFormErrors([]);
        setStopErrors([]);
    }
    useEffect(() => {
        fetchData()
    }, [])
    const setTime = () => {
        const timer = setInterval(() => {
            setEntryTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }
    const setExit = () => {
        const timer = setInterval(() => {
            setExitTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }
    const fetchEntryData = () => {
        axios.get('http://localhost:3001/getentrydetails/getentryId').then((res) => {
            setEntryId(res.data.entrydetails.entryId + 1);
        }).catch((error) => {
            console.log(error);
        });
    }
    const fetchData = () => {
        setDriverId(location.state);
        fetchEntryData();
        axios.get('http://localhost:3001/getuserDetails')
            .then(userDetails => setuserDetails(userDetails.data))
            .catch(err => console.log(err))
        axios.post('http://localhost:3001/postbusByBusId')
            .then(busdetails => {
                setBusDetails(busdetails.data)
                setTime();
                setExit();
            }).catch(err => console.log(err))
    };

    return (<>
        <DriverHeader />
        <div style={{ marginTop: '3%' }}>EntryDetails</div>
        <div className='bus-container'>
            <div className='row '>
                <div className='col col-xs-12 col-md-6 col-lg-6'>
                    <div className='row row-bus'>Entry Id</div>
                    <div className='row row-bus'>
                        <input type='text' id='entryId' name='entryId' value={entryId} disabled={true} ></input>
                    </div>
                </div>
                <div className='col col-xs-12 col-md-6 col-lg-6'>
                    <div className='row row-bus'>Bus</div>
                    <div className='row row-bus'>
                        <select value={BusNo} onChange={(e) => { findBus(e.target.value) }}>
                            <option value="">Select</option>
                            {
                                busdetails.map(
                                    (busdetail) => {
                                        return <option key={busdetail.busId} value={busdetail.busId} >{busdetail.busName} </option>
                                    }
                                )
                            }
                        </select>
                    </div>
                </div>
                <div className='col col-xs-12 col-md-6 col-lg-6'>
                    <div className='row row-bus'>Registration Number</div>
                    <div className='row row-bus'>
                        <select style={{ appearance: 'none' }} defaultValue={RouteId} id='RouteId' name='RouteId' >
                            {
                                routedetails.map(
                                    (routedetail) => {
                                        return <option key={routedetail.RouteId} value={routedetail.RouteId} >{routedetail.busRegNo} </option>
                                    }
                                )
                            }
                        </select>
                    </div>
                </div>
                <div className='col col-xs-12 col-md-6 col-lg-6'>
                    <div className='row row-bus'>Stop Name</div>
                    <div className='row row-bus'>
                        <select value={RouteId} onChange={(e) => { findRoute(e.target.value) }} >
                            <option value="">Select</option>
                            {
                                routedetails.map(
                                    (routedetail) => {
                                        return <option key={routedetail.RouteId} value={routedetail.RouteId} >{routedetail.StopName} </option>
                                    }
                                )
                            }
                        </select>
                        {stopErrors && <span className="error"><br />{stopErrors}</span>}
                    </div>
                </div>
                <div className='col col-xs-12 col-md-6 col-lg-6'>
                    <div className='row row-bus'>Card Id</div>
                    <div className='row row-bus'>
                        <select value={userId} onChange={(e) => { findName(e.target.value) }}>
                            <option value="">Select</option>
                            {
                                userDetails.map(
                                    (userDetail) => {
                                        return <option key={userDetail._id} value={userDetail._id} >{userDetail.cardNo} </option>
                                    }
                                )
                            }
                        </select>
                        {cardHolder && <span className="error"><br />{cardHolder} :Rs {currentBalance}</span>}
                        {formErrors && <span className="error"><br />{formErrors}</span>}
                    </div>
                </div>
                <div className='col col-xs-12 col-md-6 col-lg-6' hidden={true}>
                    <div className='row row-bus'>EntryTime</div>
                    <div className='row row-bus'>
                        <input type='text' id='EntryTime' name='EntryTime' value={EntryTime.toLocaleString()} readOnly={true} onChange={(e) => { setEntryTime(e.target.value) }} placeholder='Enter the Registration Number'></input>
                    </div>
                </div>
                <div className='col col-xs-12 col-md-6 col-lg-6' hidden={true}>
                    <div className='row row-bus'>ExistTime</div>
                    <div className='row row-bus'>
                        <input type='text' id='ExitTime' name='ExitTime' value={ExitTime.toLocaleString()} readOnly={true} onChange={(e) => { setExitTime(e.target.value) }} placeholder='Enter the Registration Number'></input>
                    </div>
                </div>
                <div className='col col-xs-12 col-md-6 col-lg-6' hidden={true}>
                    <div className='row row-bus'>Status</div>
                    <div className='row row-bus'>
                        <input type='text' id='Status' name='Status' value={Status} onChange={(e) => { setStatus(e.target.value) }} placeholder='Enter the ending point'></input>
                    </div>
                </div>
            </div>
        </div>
        <button className='btn-bus' onClick={handleAdd}>Add</button>
        <button className='btn-bus-clr' onClick={handleClear}>Clear</button>
        <button className='btn-bus-clr' onClick={handleCancel}>Cancel</button>
    </>
    )
}
export default EntryDetails;
