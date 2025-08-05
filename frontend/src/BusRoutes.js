import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router';
import Header from './Header';

const BusRoutes = () => {
    const [busdetails, setBusDetails] = useState([])
    const [busId, setBusId] = useState('');
    const [RouteId, setRouteId] = useState(0);
    const [StopId, setStopId] = useState(0);
    const [StopName, setStopName] = useState('');
    const [Price, setPrice] = useState(0);
    const [busRegNo, setBusRegNo] = useState('');
    const [busName, setBusName] = useState('');
    const navigate = new useNavigate();
    const findBus = (bid) => {
        axios.get('http://localhost:3001/getbusById/' + bid).then((res) => {
            //console.log(res.data)
            setBusRegNo(res.data.busdetails.registrationNo);
            setBusId(res.data.busdetails.busId)
            setBusName(res.data.busdetails.busName)
            axios.get('http://localhost:3001/getbusRoutes/getStopId/'+
             res.data.busdetails.busId ).then((resp) => {
                setStopId(resp.data.busroutes.StopId + 1);
               //     console.log(resp.data)
                }).catch((error) => {
                    console.log("Stop Id error :", error);
                })
                .catch((error) => {
                    console.log(error);

                });
        })
            .catch((error) => {
                console.log(error);

            });

    };

    const handleAdd = () => {
        if (busRegNo.trim().length !== 0 && Price.trim().length !== 0 &&
            StopName.trim().length !== 0) {
            fetchData();
            axios.post('http://localhost:3001/postbusRoutes', { busId, busName, busRegNo, RouteId, StopId, StopName, Price })
                .then((response) => {
                    console.log(response.data, "submitted");
                    handleClear()
                    navigate('/viewroutes')
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        else {
            console.log("Enter all required fields");
        }
    }
    const handleClear = () => {
        setBusId('');
        setBusRegNo('');
        setPrice(0);
        setStopId(0);
        setStopName('');
        setBusName('');
    }

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = () => {

        axios.get('http://localhost:3001/getbusdetails')
            .then(busdetails => setBusDetails(busdetails.data))
            .catch(err => console.log(err))
        axios.get('http://localhost:3001/getbusRoutes/getRouteId').then((res) => {
            setRouteId(res.data.busroutes.RouteId + 1);
        })
            .catch((error) => {
                console.log(error);
            });
    };

    return (<>
        <Header/>
        <div style={{ marginTop: '3%' }}>BusRoutes</div>
        <div className='bus-container'>
            <div className='row '>
                <div className='col col-xs-12 col-md-6 col-lg-6'>
                    <div className='row row-bus'>Bus Registration No</div>
                    <div className='row row-bus'>
                        <input type='text' name={RouteId} readOnly={true} value={RouteId} onChange={(e) => setRouteId(e.target.value)}></input>
                    </div>
                </div>

                <div className='col col-xs-12 col-md-6 col-lg-6'>
                    <div className='row row-bus'>Bus Id</div>
                    <div className='row row-bus'>
                        <select onChange={(e) => { findBus(e.target.value) }}>
                            <option value="">Select</option>
                            {
                                busdetails.map(
                                    (busdetail) => {
                                        return <option key={busdetail.busId} value={busdetail._id} >{busdetail.busName} </option>
                                    }
                                )
                            }
                        </select>

                    </div>
                </div>

                <div className='col col-xs-12 col-md-6 col-lg-6'>
                    <div className='row row-bus'>Bus Registration No</div>
                    <div className='row row-bus'>
                        <input type='text' id='busRegNo' name='busRegNo' disabled={true} value={busRegNo} onChange={(e) => setBusRegNo(e.target.value)}></input>
                    </div>
                </div>

                <div className='col col-xs-12 col-md-6 col-lg-6'>
                    <div className='row row-bus'>Stop No</div>
                    <div className='row row-bus'>
                        <input type='text' id='StopId' name='StopId'
                            value={StopId} readOnly={true} onChange={(e) => setStopId(e.target.value)} ></input>

                    </div>
                </div>
                <div className='col col-xs-12 col-md-6 col-lg-6'>
                    <div className='row row-bus'>Stop Name</div>
                    <div className='row row-bus'>
                        <input type='text' id='StopName' name='StopName' value={StopName}
                            onChange={(e) => setStopName(e.target.value)} ></input>

                    </div>
                </div>
                <div className='col col-xs-12 col-md-6 col-lg-6'>
                    <div className='row row-bus'>Price</div>
                    <div className='row row-bus'>
                        <input type='text' id='Price' name='Price' value={Price}
                            onChange={(e) => setPrice(e.target.value)} placeholder='Enter the starting point'></input>

                    </div>
                </div>


            </div>
        </div>
        <button className='btn-bus' onClick={handleAdd}>Add</button>
        <button className='btn-bus-clr' onClick={handleClear}>Clear</button>
    </>
    )
}
export default BusRoutes;