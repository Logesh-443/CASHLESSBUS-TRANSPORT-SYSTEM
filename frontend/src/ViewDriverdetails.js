import React from 'react';
import axios from 'axios';
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import Header from './Header';

const ViewDriverdetails = () => {
    const [driverdetails, setDriverDetails] = useState([])
    const [view, setView] = useState(false)
    const [driverId, setDriverId] = useState('')
    const [_id, set_Id] = useState('')
    const [driverName, setDriverName] = useState('')
    const [driverMobileNo, setDriverNo] = useState('')
    const [licenseNo, setLicenseNo] = useState('')
    const [password, setPassword] = useState('')

    const updateDriver = (e) => {
        e.preventDefault()
        axios.put('http://localhost:3001/putdriverdetails/' + _id, { driverId, driverName, driverMobileNo, licenseNo, password })
            .then((response) => {
                fetchData();
                console.log("Driver details updated successfully! ")
                setView(false);
            }).catch((err) => {
                console.log("Something went wrong!", err)
            })
    }
    const handleDelete = (bid) => {
        axios.delete('http://localhost:3001/deletedriverdetails/' + bid)
            .then((response) => {
                console.log("Driver details deleted successfully! ")
                fetchData();
            }).catch((err) => {
                console.log("Something went wrong!", err)
            })
    }
    const handleUpdate = (bid) => {
        set_Id(bid)
        fetchDriverById(bid);
        setView(true)
    }

    const fetchDriverById = (bid) => {
        axios.get('http://localhost:3001/getdriverById/' + bid)
            .then(response => {
                console.log(response);
                setDriverId(response.data.driverdetails.driverId)
                setDriverName(response.data.driverdetails.driverName)
                setDriverNo(response.data.driverdetails.driverMobileNo)
                setLicenseNo(response.data.driverdetails.licenseNo)
                setPassword(response.data.driverdetails.password)
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
        axios.get('http://localhost:3001/getdriverdetails')
            .then(driverdetails => setDriverDetails(driverdetails.data))
            .catch(err => console.log(err))
    }

    return (<>
    <Header/>
        {
            view ?
                <form>
                    <div className='bus-container'>
                        <div className='row '>
                            <div className='col col-xs-12 col-md-6 col-lg-6'>
                                <div className='row row-bus'>Driver Id</div>
                                <div className='row row-bus'>
                                    <input value={driverId} disabled={true} />
                                </div>
                            </div>

                            <div className='col col-xs-12 col-md-6 col-lg-6'>
                                <div className='row row-bus'>Driver Name</div>
                                <div className='row row-bus'>
                                    <input value={driverName}
                                        onChange={(e) => setDriverName(e.target.value)} />
                                </div>
                            </div>
                            <div className='col col-xs-12 col-md-6 col-lg-6'>
                                <div className='row row-bus'>Mobile No</div>
                                <div className='row row-bus'>
                                    <input value={driverMobileNo}
                                        onChange={(e) => setDriverNo(e.target.value)} />
                                </div>
                            </div>
                            <div className='col col-xs-12 col-md-6 col-lg-6'>
                                <div className='row row-bus'>License Number</div>
                                <div className='row row-bus'>
                                    <input value={licenseNo}
                                        onChange={(e) => setLicenseNo(e.target.value)} />
                                </div>
                            </div>
                            <div className='col col-xs-12 col-md-6 col-lg-6'>
                                <div className='row row-bus'>Password</div>
                                <div className='row row-bus'>
                                    <input type='password' value={password}
                                        onChange={(e) => setPassword(e.target.value)} />
                                </div>
                            </div>
                        </div >
                    </div >
                    <button className='btn-bus' onClick={(e) => { updateDriver(e) }}>Update</button>
                    <button className='btn-bus-clr' style={{ paddingBottom: '5%' }} onClick={handleCancel}>Cancel</button>
                </form >
                : null
        }

        <div className='view-list'>Driver Lists </div>

        <div className='container'>
            <Link className="lnk-btn" to="/driver">Add Driver</Link>
            <table className="table table-striped table-bus">
                <thead>
                    <tr>
                        <th>Driver Name</th>
                        <th>Mobile No</th>
                        <th>License No</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        driverdetails.map(driverdetail => {
                            return (<tr key={driverdetail._id}>
                                <td>{driverdetail.driverName}</td>
                                <td>{driverdetail.driverMobileNo}</td>
                                <td>{driverdetail.licenseNo}</td>
                                <td><button className='btn-bus' onClick={() => handleUpdate(driverdetail._id)}>Update</button>
                                    <button className='btn-bus-clr' onClick={() => handleDelete(driverdetail._id)}>Delete</button></td>
                            </tr>)
                        })
                    }
                </tbody>
            </table>
        </div>
    </>
    )
}

export default ViewDriverdetails;
