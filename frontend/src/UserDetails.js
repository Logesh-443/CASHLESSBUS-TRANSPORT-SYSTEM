import React, { useEffect, useState } from 'react'
import validateField from './validator';
import axios from 'axios';
import { useNavigate } from 'react-router';
import Header from './Header';

const UserDetails = () => {
    const [userDetails, setUserDetails] = useState({
        userId: 0,
        userName: '',
        userMobileNo: '',
        userMail: '',
        cardNo: '',
        cardBalance: 0
    });
    const [formErrors, setFormErrors] = useState('');
    const navigate = new useNavigate();
    const handleChange = (event) => {
        //console.log(event.target.name + " : " + event.target.value)
        setUserDetails({ ...userDetails, [event.target.name]: event.target.value });
        const error = validateField(event.target.name, event.target.value, userDetails);
        setFormErrors({ ...formErrors, [event.target.name]: error });
    }
    const handleAdd = () => {
        if (userDetails.userName.trim().length !== 0 && userDetails.userMobileNo.trim().length !== 0 &&
            userDetails.userMail.trim().length !== 0 && userDetails.cardNo.trim().length !== 0 &&
            userDetails.cardBalance.trim().length !== 0) {
            fetchData();
            axios.post('http://localhost:3001/postuserDetails', userDetails)
                .then((response) => {
                    console.log(response.data, "submitted");
                    setUserDetails({
                        userName: '',
                        userMobileNo: '',
                        userMail: '',
                        cardNo: '',
                        cardBalance: ''
                    });
                    navigate('/viewuser')
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
        setUserDetails({
            userName: '',
            userMobileNo: '',
            userMail: '',
            cardNo: '',
            cardBalance: ''
        });
    }

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = () => {
        axios.get('http://localhost:3001/getuserDetails/getuserId')
            .then((res) => {
                const rid = randomId(12);
                setUserDetails({ ...userDetails, userId: res.data.userDetails.userId + 1, cardNo: rid });
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const randomId = function (length = 6) {
        return Math.random().toString(36).substring(2, length + 2);
    };

    return (<>
        <Header/>
        <div style={{ marginTop: '3%' }}>UserDetails</div>
        <div className='bus-container'>
            <div className='row '>
                <div className='col col-xs-12 col-md-6 col-lg-6'>
                    <div className='row row-bus'>User Id</div>
                    <div className='row row-bus'>
                        <input type='text' id='userId' name='userId' value={userDetails.userId} disabled={true} ></input>
                    </div>
                </div>

                <div className='col col-xs-12 col-md-6 col-lg-6'>
                    <div className='row row-bus'>User Name</div>
                    <div className='row row-bus'>
                        <input type='text' id='userName' name='userName' value={userDetails.userName} placeholder='Enter the User Name' onChange={handleChange}></input>
                        {formErrors.userName && <span className="error">{formErrors.userName}</span>}
                    </div>
                </div>
                <div className='col col-xs-12 col-md-6 col-lg-6'>
                    <div className='row row-bus'>Mobile No</div>
                    <div className='row row-bus'>
                        <input type='text' id='userMobileNo' name='userMobileNo' value={userDetails.userMobileNo} onChange={handleChange} placeholder='Enter the Mobile No'></input>
                        {formErrors.userMobileNo && <span className="error">{formErrors.userMobileNo}</span>}
                    </div>
                </div>
                <div className='col col-xs-12 col-md-6 col-lg-6'>
                    <div className='row row-bus'>Mail Id</div>
                    <div className='row row-bus'>
                        <input type='text' id='userMail' name='userMail' value={userDetails.userMail} onChange={handleChange} placeholder='Enter the Mail Id'></input>
                        {formErrors.userMail && <span className="error">{formErrors.userMail}</span>}
                    </div>
                </div>
                <div className='col col-xs-12 col-md-6 col-lg-6'>
                    <div className='row row-bus'>Card No</div>
                    <div className='row row-bus'>
                        <input type='text' id='cardNo' readOnly={true} name='cardNo' value={userDetails.cardNo} onChange={handleChange} placeholder='Enter the starting point'></input>
                        {formErrors.cardNo && <span className="error">{formErrors.cardNo}</span>}
                    </div>
                </div>
                <div className='col col-xs-12 col-md-6 col-lg-6'>
                    <div className='row row-bus'>Card Balance</div>
                    <div className='row row-bus'>
                        <input type='text' id='cardBalance' name='cardBalance' value={userDetails.cardBalance} onChange={handleChange} placeholder='Enter the ending point'></input>
                        {formErrors.cardBalance && <span className="error">{formErrors.cardBalance}</span>}
                    </div>
                </div>

            </div>
        </div>
        <button className='btn-bus' onClick={handleAdd}>Add</button>
        <button className='btn-bus-clr' onClick={handleClear}>Clear</button>
    </>
    )
}
export default UserDetails;
