import React from 'react';
import axios from 'axios';
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import Header from './Header';

const ViewBusdetails = () => {
    const [busdetails, setBusDetails] = useState([])
    const [view, setView] = useState(false)
    const [busId, setBusId] = useState('')
    const [_id, set_Id] = useState('')
    const [busName, setBusName] = useState('')
    const [busNo, setBusNo] = useState('')
    const [registrationNo, setRegistrationNo] = useState('')
    const [source, setSource] = useState('')
    const [destination, setDestination] = useState('')
    
    const updateBus = (e) => {
        e.preventDefault()        
        axios.put('http://localhost:3001/putbusdetails/'+_id, {busId,busName,busNo,registrationNo,source,destination})
        .then( (response) => {
            fetchData();
                console.log("Bus details updated successfully! ")
                setView(false);
            }
        ).catch((err) => {
            console.log("Something went wrong!", err)
            }
        )        
        
    }
    const handleDelete=(bid)=>{
        axios.delete('http://localhost:3001/deletebusdetails/'+bid)
        .then( (response) => {
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
        fetchBusById(bid);
        setView(true)
    }

    const fetchBusById = (bid) => {
        axios.get('http://localhost:3001/getbusById/'+bid)
            .then(response => {
                //console.log(response);
                setBusId(response.data.busdetails.busId)
                setBusName(response.data.busdetails.busName)
                setBusNo(response.data.busdetails.busNo)
                setRegistrationNo(response.data.busdetails.registrationNo)
                setSource(response.data.busdetails.source)
                setDestination(response.data.busdetails.destination)
            })
            .catch(err => console.log(err))
    };
    const handleCancel = () => {
        setView(false)
    }
    useEffect(() => {
        fetchData();
    }, [])
    const fetchData=()=>{
        axios.get('http://localhost:3001/getbusdetails')
            .then(busdetails => setBusDetails(busdetails.data))
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
                                <div className='row row-bus'>Bus Id</div>
                                <div className='row row-bus'>
                                    <input value={busId} disabled={true} />
                                </div>
                            </div>

                            <div className='col col-xs-12 col-md-6 col-lg-6'>
                                <div className='row row-bus'>Bus Name</div>
                                <div className='row row-bus'>
                                    <input value={busName}
                                        onChange={(e) => setBusName( e.target.value ) }/>
                                </div>
                            </div>
                            <div className='col col-xs-12 col-md-6 col-lg-6'>
                                <div className='row row-bus'>Bus No</div>
                                <div className='row row-bus'>
                                    <input value={busNo}
                                        onChange={(e) =>  setBusNo(e.target.value) } />
                                </div>
                            </div>
                            <div className='col col-xs-12 col-md-6 col-lg-6'>
                                <div className='row row-bus'>Registration Number</div>
                                <div className='row row-bus'>
                                    <input value={registrationNo}
                                        onChange={(e) =>  setRegistrationNo(  e.target.value ) } />
                                </div>
                            </div>
                            <div className='col col-xs-12 col-md-6 col-lg-6'>
                                <div className='row row-bus'>Source</div>
                                <div className='row row-bus'>
                                    <input value={source}
                                        onChange={(e) =>  setSource( e.target.value ) } />
                                </div>
                            </div >
                            <div className='col col-xs-12 col-md-6 col-lg-6'>
                                <div className='row row-bus'>Destination</div>
                                <div className='row row-bus'>
                                    <input value={destination}
                                        onChange={(e) => setDestination(e.target.value) } />
                                </div>
                            </div >

                        </div >
                    </div >
                    <button className='btn-bus' onClick={(e) => { updateBus(e) }}>Update</button>
                    <button className='btn-bus-clr' style={{ paddingBottom: '5%' }} onClick={handleCancel}>Cancel</button>
                </form >
                : null
        }

        <div className='view-list'>Bus Lists </div>
        
        <div className='container'>
        <Link className="lnk-btn" to="/bus">Add Bus</Link>
            <table className="table table-striped table-bus">
                <thead>
                    <tr>
                        <th>Bus Name</th>
                        <th>Bus No</th>
                        <th>Registration No</th>
                        <th>Source</th>
                        <th>Destination</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        busdetails.map(busdetail => {
                            return (<tr key={busdetail._id}>
                                <td>{busdetail.busName}</td>
                                <td>{busdetail.busNo}</td>
                                <td>{busdetail.registrationNo}</td>
                                <td>{busdetail.source}</td>
                                <td>{busdetail.destination}</td>
                                <td><button className='btn-bus' onClick={() => handleUpdate(busdetail._id)}>Update</button>
                                    <button className='btn-bus-clr' onClick={()=>handleDelete(busdetail._id)}>Delete</button></td>
                            </tr>)
                        })
                    }
                </tbody>
            </table>
        </div>
    </>
    )
}

export default ViewBusdetails;