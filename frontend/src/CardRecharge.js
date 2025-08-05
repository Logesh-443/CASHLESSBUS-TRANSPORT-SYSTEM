import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import validateField from './validator';
import Header from './Header';

const CardRecharge = () => {
    const [cardRechargeId, setCardRechargeId] = useState(0);
    const [cardHolder, setCardHolder] = useState('');
    const [cardNo, setCardNo] = useState('');
    const [currentBalance, setCurrentBalance] = useState(0);
    const [rechargeAmount, setRechargeAmount] = useState(0);
    const [cardBalance, setCardBalance] = useState(0);
    const [userDetails, setuserDetails] = useState([])
    const [formErrors, setFormErrors] = useState('');
    const [userId, setUserId] = useState(0)
    const navigate = new useNavigate();

    const handleAdd = () => {
        if (cardHolder.trim().length !== 0 &&
            rechargeAmount.trim().length !== 0) {
            fetchData();
            updateBus(userId);
            axios.post('http://localhost:3001/postcardDetails', { cardRechargeId, userId,cardNo, cardHolder, currentBalance, rechargeAmount,cardBalance })
                .then((response) => {
                    updateBus(userId)
                    console.log(response.data, "submitted");
                    navigate('/viewrecharge')
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        else {
            console.log("Enter all required fields");
        }
    }
    const updateBus = (_id) => {
        axios.put('http://localhost:3001/putuserCardbalance/' + _id, { cardBalance })
            .then((response) => {
                console.log("Card balance updated")
            }).catch((err) => {
                console.log("Something went wrong!", err)
            })
    }
    const handleRechargeAmount = (event) => {
        const amt = event.target.value;
        setRechargeAmount(amt)
        const bal = parseInt(currentBalance) + parseInt(amt);
        console.log(bal);
        setCardBalance(bal);
        const error = validateField(event.target.name, event.target.value, rechargeAmount);
        setFormErrors(error);
    }
    const handleClear = () => {
        setCardHolder('')
        setCardNo('')
        setCurrentBalance(0)
        setRechargeAmount(0)
    }
    const findName = (bid) => {
        axios.get('http://localhost:3001/getuserById/' + bid).then((res) => {
            //console.log(res)
            setCardHolder(res.data.userName)
            setCurrentBalance(res.data.cardBalance)
            setRechargeAmount(0)
            setUserId(res.data._id)
            setCardNo(res.data.cardNo)
        }).catch((error) => {
            console.log(error);
        });
    };
    useEffect(() => {
        fetchData()
    }, [])
    const fetchData = () => {
        axios.get('http://localhost:3001/getuserDetails')
            .then(userDetails => setuserDetails(userDetails.data))
            .catch(err => console.log(err))
        axios.get('http://localhost:3001/getcardDetails/getcardRechargeId')
            .then((res) => {
                setCardRechargeId(res.data.cardDetails.cardRechargeId + 1);
            }).catch((error) => {
                console.log(error);
            });
    };
    return (<>
        <Header/>
        <div style={{ marginTop: '3%' }}>CardRecharge</div>
        <div className='bus-container'>
            <div className='row '>
                <div className='col col-xs-12 col-md-6 col-lg-6'>
                    <div className='row row-bus'>Recharge Id</div>
                    <div className='row row-bus'>
                        <input type='text' id='cardRechargeId' name='cardRechargeId' value={cardRechargeId} disabled={true} ></input>
                    </div>
                </div>
                <div className='col col-xs-12 col-md-6 col-lg-6'>
                    <div className='row row-bus'>Card No</div>
                    <div className='row row-bus'>
                        <select onChange={(e) => { findName(e.target.value) }}>
                            <option value="">Select</option>
                            {
                                userDetails.map(
                                    (userDetail) => {
                                        return <option key={userDetail._id} value={userDetail._id} >{userDetail.cardNo} </option>
                                    }
                                )
                            }
                        </select>
                    </div>
                </div>
                <div className='col col-xs-12 col-md-6 col-lg-6'>
                    <div className='row row-bus'>Holder Name</div>
                    <div className='row row-bus'>
                        <input type='text' id='cardHolder' name='cardHolder' value={cardHolder}
                            onChange={(e) => setCardHolder(e.target.value)}></input>
                    </div>
                </div>
                <div className='col col-xs-12 col-md-6 col-lg-6'>
                    <div className='row row-bus'>Current Balance</div>
                    <div className='row row-bus'>
                        <input type='text' id='currentBalance' name='currentBalance' value={currentBalance} onChange={(e) => setCurrentBalance(e.target.value)} readOnly={true}></input>
                    </div>
                </div>
                <div className='col col-xs-12 col-md-6 col-lg-6'>
                    <div className='row row-bus'>Recharge Amount</div>
                    <div className='row row-bus'>
                        <input type='text' id='rechargeAmount' name='rechargeAmount' value={rechargeAmount} onChange={handleRechargeAmount} placeholder='Enter the Amount'></input>
                        {formErrors && <span className="error">{formErrors}</span>}
                    </div>
                    <div className='row row-bus' hidden={true}>
                        <input type='text' id='cardBalance' name='cardBalance' value={cardBalance} onChange={(e) => setCardBalance(e.target.value)}></input>
                    </div>
                </div>
            </div>
        </div>
        <button className='btn-bus' onClick={handleAdd}>Add</button>
        <button className='btn-bus-clr' onClick={handleClear}>Clear</button>
    </>
    )
}
export default CardRecharge;
