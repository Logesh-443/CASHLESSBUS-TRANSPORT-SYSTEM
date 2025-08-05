import React, { useEffect, useState } from 'react'
import validateField from './validator';
import axios from 'axios';
import { useNavigate } from 'react-router';
import Header from './Header';

const BusDetails = () => {
    const [busdetails, setBusDetails] = useState({
        busId: '',
        busName: '',
        busNo: '',
        registrationNo: '',
        source: '',
        destination: ''
    });
    const [formErrors, setFormErrors] = useState('');
    const navigate= new useNavigate();
    const handleChange = (event) => {
        //console.log(event.target.name + " : " + event.target.value)
        setBusDetails({ ...busdetails, [event.target.name]: event.target.value });
        const error = validateField(event.target.name, event.target.value, busdetails);
        setFormErrors({ ...formErrors, [event.target.name]: error });
    }
    const handleAdd = () => {
        if (busdetails.busName.trim().length !== 0 && busdetails.busNo.trim().length !== 0 &&
            busdetails.registrationNo.trim().length !== 0 && busdetails.source.trim().length !== 0 &&
            busdetails.destination.trim().length !== 0) {
                fetchData();
            axios.post('http://localhost:3001/postbusdetails', busdetails)
                .then((response) => {
                    console.log(response.data, "submitted");
                    setBusDetails({
                    busName: '',
                    busNo: '',
                    registrationNo: '',
                    source: '',
                    destination: ''});
                    navigate('/viewbus')
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
        setBusDetails({
        busName: '',
        busNo: '',
        registrationNo: '',
        source: '',
        destination: ''});
    }

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = () => {
        axios.get('http://localhost:3001/getbusdetails/getbusId').then((res) => {
            setBusDetails({ ...busdetails, busId: res.data.busdetails.busId + 1 });
        })
            .catch((error) => {
                console.log(error);
            });
    };

    return (<>
    <Header/>
        <div style={{ marginTop: '3%' }}>BusDetails</div>
        <div className='bus-container'>
            <div className='row '>
                <div className='col col-xs-12 col-md-6 col-lg-6'>
                    <div className='row row-bus'>Bus Id</div>
                    <div className='row row-bus'>
                        <input type='text' id='busId' name='busId' value={busdetails.busId} disabled={true} ></input>
                    </div>
                </div>

                <div className='col col-xs-12 col-md-6 col-lg-6'>
                    <div className='row row-bus'>Bus Name</div>
                    <div className='row row-bus'>
                        <input type='text' id='busName' name='busName' value={busdetails.busName} placeholder='Enter the Bus Name' onChange={handleChange}></input>
                        {formErrors.busName && <span className="error">{formErrors.busName}</span>}
                    </div>
                </div>
                <div className='col col-xs-12 col-md-6 col-lg-6'>
                    <div className='row row-bus'>Bus No</div>
                    <div className='row row-bus'>
                        <input type='text' id='busNo' name='busNo' value={busdetails.busNo} onChange={handleChange} placeholder='Enter the Bus No ex: 2A'></input>
                        {formErrors.busNo && <span className="error">{formErrors.busNo}</span>}
                    </div>
                </div>
                <div className='col col-xs-12 col-md-6 col-lg-6'>
                    <div className='row row-bus'>Registration Number</div>
                    <div className='row row-bus'>
                        <input type='text' id='registrationNo' name='registrationNo' value={busdetails.registrationNo} onChange={handleChange} placeholder='Enter the Registration Number'></input>
                        {formErrors.registrationNo && <span className="error">{formErrors.registrationNo}</span>}
                    </div>
                </div>
                <div className='col col-xs-12 col-md-6 col-lg-6'>
                    <div className='row row-bus'>Source</div>
                    <div className='row row-bus'>
                        <input type='text' id='source' name='source' value={busdetails.source} onChange={handleChange} placeholder='Enter the starting point'></input>
                        {formErrors.source && <span className="error">{formErrors.source}</span>}
                    </div>
                </div>
                <div className='col col-xs-12 col-md-6 col-lg-6'>
                    <div className='row row-bus'>Destination</div>
                    <div className='row row-bus'>
                        <input type='text' id='destination' name='destination' value={busdetails.destination} onChange={handleChange} placeholder='Enter the ending point'></input>
                        {formErrors.destination && <span className="error">{formErrors.destination}</span>}
                    </div>
                </div>

            </div>
        </div>
        <button className='btn-bus' onClick={handleAdd}>Add</button>
        <button className='btn-bus-clr' onClick={handleClear}>Clear</button>
    </>
    )
}
export default BusDetails;
