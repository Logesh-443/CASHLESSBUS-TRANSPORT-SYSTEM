import React, { useEffect, useState } from 'react'
import validateField from './validator';
import axios from 'axios';
import { useNavigate } from 'react-router';
import Header from './Header';

const DriverDetails = () => {
    const [driverdetails, setDriverDetails] = useState({
        driverId: '',
        driverName: '',
        driverMobileNo: '',
        licenseNo: '',
        password: ''
    });
    const [formErrors, setFormErrors] = useState('');
    const navigate = new useNavigate();
    const handleChange = (event) => {
        //console.log(event.target.name + " : " + event.target.value)
        setDriverDetails({ ...driverdetails, [event.target.name]: event.target.value });
        const error = validateField(event.target.name, event.target.value, driverdetails);
        setFormErrors({ ...formErrors, [event.target.name]: error });
    }
    const handleAdd = () => {
        if (driverdetails.driverName.trim().length !== 0 && driverdetails.driverMobileNo.trim().length !== 0 &&
            driverdetails.licenseNo.trim().length !== 0 && driverdetails.password.trim().length !== 0) {
            fetchData();
            axios.post('http://localhost:3001/postdriverdetails', driverdetails)
                .then((response) => {
                    console.log(response.data, "submitted");
                    setDriverDetails({
                        driverName: '',
                        driverMobileNo: '',
                        licenseNo: '',
                        password: ''
                    });
                    navigate('/viewdriver')
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
        setDriverDetails({
            driverName: '',
            driverMobileNo: '',
            licenseNo: '',
            password: '',
        });
    }
    useEffect(() => {
        fetchData();
    }, [])
    const fetchData = () => {
        axios.get('http://localhost:3001/getdriverdetails/getdriverId').then((res) => {
            setDriverDetails({ ...driverdetails, driverId: res.data.driverdetails.driverId + 1 });
        })
            .catch((error) => {
                console.log(error);
            });
    };

    return (<>
        <Header />
        <div style={{ marginTop: '3%' }}>Driver Details</div>
        <div className='bus-container'>
            <div className='row '>
                <div className='col col-xs-12 col-md-6 col-lg-6'>
                    <div className='row row-bus'>Driver Id</div>
                    <div className='row row-bus'>
                        <input type='text' id='driverId' name='driverId' value={driverdetails.driverId} disabled={true} ></input>
                    </div>
                </div>

                <div className='col col-xs-12 col-md-6 col-lg-6'>
                    <div className='row row-bus'>Driver Name</div>
                    <div className='row row-bus'>
                        <input type='text' id='driverName' name='driverName' value={driverdetails.driverName} placeholder='Enter the Driver Name' onChange={handleChange}></input>
                        {formErrors.driverName && <span className="error">{formErrors.driverName}</span>}
                    </div>
                </div>
                <div className='col col-xs-12 col-md-6 col-lg-6'>
                    <div className='row row-bus'>Driver Mobile No</div>
                    <div className='row row-bus'>
                        <input type='text' id='driverMobileNo' name='driverMobileNo' value={driverdetails.driverMobileNo} onChange={handleChange} placeholder='Enter the Mobile No' ></input>
                        {formErrors.driverMobileNo && <span className="error">{formErrors.driverMobileNo}</span>}
                    </div>
                </div>
                <div className='col col-xs-12 col-md-6 col-lg-6'>
                    <div className='row row-bus'>License Number</div>
                    <div className='row row-bus'>
                        <input type='text' id='licenseNo' name='licenseNo' value={driverdetails.licenseNo} onChange={handleChange} placeholder='Enter the License Number'></input>
                        {formErrors.licenseNo && <span className="error">{formErrors.licenseNo}</span>}
                    </div>
                </div>
                <div className='col col-xs-12 col-md-6 col-lg-6'>
                    <div className='row row-bus'>Password</div>
                    <div className='row row-bus'>
                        <input type='password' id='password' name='password' value={driverdetails.password} onChange={handleChange} placeholder='Enter the password'></input>
                        {formErrors.password && <span className="error">{formErrors.password}</span>}
                    </div>
                </div>
            </div>
        </div>
        <button className='btn-bus' onClick={handleAdd}>Add</button>
        <button className='btn-bus-clr' onClick={handleClear}>Clear</button>
    </>
    )
}
export default DriverDetails;
