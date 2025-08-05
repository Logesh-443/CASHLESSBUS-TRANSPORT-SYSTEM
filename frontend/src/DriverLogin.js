import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const DriverLogin = () => {
    const [formData, setFormData] = useState({
        driverMobileNo: '',
        password: '',
    });
    const [formError, setFormError] = useState('')
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = () => {
        axios.post('http://localhost:3001/postdriverlogin', formData)
            .then(res => {
                console.log(res)
                if (res.data === "success") {
                    const driverId = formData.driverMobileNo
                    navigate('/entry', { state:  driverId  });
                }
                else {
                    setFormError("mobile no or password incorrect")
                }
            }).catch(error => {
                console.error(error);
            })
    };

    return (<>
        <div style={{ marginTop: '3%' }}>SignIn</div>
        <div className='bus-container'>
            <div className='col col-xs-6 col-md-4 col-lg-4'>
                <div className='row row-bus'>Mobile No</div>
                <div className='row row-bus'>
                    <input type='text' id='driverMobileNo' name='driverMobileNo' value={formData.driverMobileNo} onChange={handleChange}></input>
                </div>
                <div className='row row-bus'>Password</div>
                <div className='row row-bus'>
                    <input type='password' id='password' name='password' value={formData.password} onChange={handleChange}></input>
                </div>
                <div className='row row-bus'>
                    {formError && <span className='error'>{formError}</span>}
                </div>
            </div>
        </div>
        <button className='btn-bus' onClick={handleSubmit}>Login</button>
    </>
    );
};

export default DriverLogin