import React from 'react';
import axios from 'axios';
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import  Header  from './Header';

const ViewRoute = () => {
    const [routeDetails, setRouteDetails] = useState([])
    const [view, setView] = useState(false)
    const [RouteId, setRouteId] = useState('')
    const [_id, set_Id] = useState('')
    const [busId, setBusId] = useState('')
    const [StopId, setStopId] = useState('')
    const [busRegNo, setBusRegNo] = useState('')
    const [StopName, setStopName] = useState('')
    const [Price, setPrice] = useState('')
    const [busdetails, setBusDetails] = useState([])
    const [busName, setBusName] = useState('')
    const findBus = (bid) => {
        axios.get('http://localhost:3001/getbusById/' + bid).then((res) => {
            setBusRegNo(res.data.busdetails.registrationNo);
            setBusId(res.data.busdetails.busId)
            setBusName(res.data.busdetails.busName)
            set_Id(bid)
        })
            .catch((error) => {
                console.log(error);

            });
    };

    const updateBus = (e) => {
        e.preventDefault()
        axios.put('http://localhost:3001/putbusRoutes/' + _id, { RouteId, busId, busName, StopId, busRegNo, StopName, Price })
            .then((response) => {
                fetchData();
                console.log("Bus details updated successfully! ")
                setView(false);
            }
            ).catch((err) => {
                console.log("Something went wrong!", err)
            }
            )

    }
    const handleDelete = (bid) => {
        axios.delete('http://localhost:3001/deletebusRoutes/' + bid)
            .then((response) => {
                console.log("Bus details deleted successfully! ")
                fetchData();
            }
            ).catch((err) => {
                console.log("Something went wrong!", err)
            }
            )
    }
    const handleUpdate = (bid) => {
        set_Id(bid)
        fetchBusData();
        fetchBusById(bid);
        setView(true)
    }

    const fetchBusById = (bid) => {
        axios.get('http://localhost:3001/getRouteById/' + bid)
            .then(response => {
                setRouteId(response.data.busroutes.RouteId)
                setBusId(response.data.busroutes.busId)
                setBusName(response.data.busroutes.busName)
                setStopId(response.data.busroutes.StopId)
                setBusRegNo(response.data.busroutes.busRegNo)
                setStopName(response.data.busroutes.StopName)
                setPrice(response.data.busroutes.Price)
                set_Id(response.data.busroutes._id);
            })
            .catch(err => console.log(err))
    };
    const handleCancel = () => {
        setView(false)
    }
    useEffect(() => {
        fetchData();
    }, [])
    const fetchData = () => {
        axios.get('http://localhost:3001/getbusRoutes')
            .then(routeDetails => {
                setRouteDetails(routeDetails.data)
            }).catch(err => console.log(err))
    }
    const fetchBusData = () => {

        axios.get('http://localhost:3001/getbusdetails')
            .then(busdetails => setBusDetails(busdetails.data))
            .catch(err => console.log(err))
    };

    return (<>
        <Header/>
        {
            view ?
                <form>
                    <div className='bus-container'>
                        <div className='row '>
                            <div className='col col-xs-12 col-md-6 col-lg-6'>
                                <div className='row row-bus'>Route Id</div>
                                <div className='row row-bus'>
                                    <input value={RouteId} disabled={true} />
                                </div>
                            </div>

                            <div className='col col-xs-12 col-md-6 col-lg-6'>
                                <div className='row row-bus'>Bus Name</div>
                                <div className='row row-bus'>
                                    <select id={busId} value={busId} onChange={(e) => { findBus(e.target.value) }}>

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
                                    <input value={busRegNo} readOnly={true}
                                        onChange={(e) => setBusRegNo(e.target.value)} />
                                </div>
                            </div>
                            <div className='col col-xs-12 col-md-6 col-lg-6'>
                                <div className='row row-bus'>Stop No</div>
                                <div className='row row-bus'>
                                    <input value={StopId}
                                        onChange={(e) => setStopId(e.target.value)} />
                                </div>
                            </div>
                            <div className='col col-xs-12 col-md-6 col-lg-6'>
                                <div className='row row-bus'>Stop Name</div>
                                <div className='row row-bus'>
                                    <input value={StopName}
                                        onChange={(e) => setStopName(e.target.value)} />
                                </div>
                            </div >
                            <div className='col col-xs-12 col-md-6 col-lg-6'>
                                <div className='row row-bus'>Price</div>
                                <div className='row row-bus'>
                                    <input value={Price}
                                        onChange={(e) => setPrice(e.target.value)} />
                                </div>
                            </div >

                        </div >
                    </div >
                    <button className='btn-bus' onClick={(e) => { updateBus(e) }}>Update</button>
                    <button className='btn-bus-clr' style={{ paddingBottom: '5%' }} onClick={handleCancel}>Cancel</button>
                </form >
                : null
        }



        <div className='view-list'>Bus Routes </div>
        
        <div className='container'>
        <Link className="lnk-btn" to="/BusRoutes">Add Bus Route</Link>
            <table className="table table-striped table-bus">
                <thead>
                    <tr>
                        <th>Bus Name</th>
                        <th>Registration No</th>
                        <th>Stop Name</th>
                        <th>Price</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        routeDetails.map(routeDetail => {
                            return (<tr key={routeDetail._id}>
                                <td value={routeDetail.busId} >{routeDetail.busName}</td>
                                <td>{routeDetail.busRegNo}</td>
                                <td>{routeDetail.StopName}</td>
                                <td>{routeDetail.Price}</td>
                                <td><button className='btn-bus' onClick={() => handleUpdate(routeDetail._id)}>Update</button>
                                    <button className='btn-bus-clr' onClick={() => handleDelete(routeDetail._id)}>Delete</button></td>
                            </tr>)
                        })
                    }
                </tbody>
            </table>
        </div>
    </>
    )
}

export default ViewRoute;
