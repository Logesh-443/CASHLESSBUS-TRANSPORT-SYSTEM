import React from 'react';
import axios from 'axios';
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import validateField from './validator';
import  Header  from './Header';

const ViewRechargeDetails = () => {
    const [cardDetails, setCardDetails] = useState([])
    const [view, setView] = useState(false)
    const [cardRechargeId, setCardRechargeId] = useState(0)
    const [_id, set_Id] = useState(0)
    const [userId, setUserId] = useState(0)
    const [cardHolder, setCardHolder] = useState('')
    const [currentBalance, setCurrentBalance] = useState(0)
    const [rechargeAmount, setRechargeAmount] = useState(0)
    const [cardNo, setCardNo] = useState('')
    const [Balance, setBalance] = useState(0)
    const [userDetails, setuserDetails] = useState([])
    const [formErrors, setFormErrors] = useState('');

    const updateCard = (e) => {
        e.preventDefault()
        let cardBalance=Balance
        axios.put('http://localhost:3001/putcardDetails/' + _id, { cardRechargeId, userId, cardHolder, currentBalance, rechargeAmount, cardNo, cardBalance })
            .then((response) => {
                axios.put('http://localhost:3001/putuserCardbalance/' + userId, { cardBalance })
                    .then((response) => {
                        console.log("Card details updated successfully! ")
                    }).catch((err) => {
                        console.log("Something went wrong!", err)
                    })
                fetchData();
                setView(false);
            }).catch((err) => {
                console.log("Something went wrong!", err)
            })
    }
   
    const handleUpdate = (bid) => {
        set_Id(bid)
        fetchUser()
        fetchCardById(bid);
        setView(true)
    }
    const handleRechargeAmount = (event) => {
        const amt = event.target.value;
        setRechargeAmount(amt)
        const bal = parseInt(currentBalance) + parseInt(amt);
        setBalance(bal);
        const error = validateField(event.target.name, event.target.value, rechargeAmount);
        setFormErrors(error);
    }
    const fetchCardById = (bid) => {
        axios.get('http://localhost:3001/getcardById/' + bid)
            .then(response => {
                setCardRechargeId(response.data.cardDetails.cardRechargeId)
                setCardHolder(response.data.cardDetails.cardHolder)
                setCurrentBalance(response.data.cardDetails.currentBalance)
                setRechargeAmount(response.data.cardDetails.rechargeAmount)
                setCardNo(response.data.cardDetails.cardNo)
                set_Id(response.data.cardDetails._id)
                setUserId(response.data.cardDetails.userId)
            })
            .catch(err => console.log(err))
    };
    const handleCancel = () => {
        setView(false)
    }
    const findCard = (bid) => {
        axios.get('http://localhost:3001/getuserById/' + bid)
            .then((res) => {
                setCardHolder(res.data.userDetails.userName)
                setCurrentBalance(res.data.userDetails.cardBalance)
                setRechargeAmount(0)
                setBalance(res.data.userDetails.cardBalance)
                setUserId(res.data.userDetails._id)
            }).catch((error) => {
                console.log(error);
            });
    };
    useEffect(() => {
        fetchData();
    }, [])
    const fetchData = () => {
        axios.get('http://localhost:3001/getcardDetails')
            .then(cardDetails => setCardDetails(cardDetails.data))
            .catch(err => console.log(err))
    }
    const fetchUser = () => {
        axios.get('http://localhost:3001/getuserDetails')
            .then(userDetails => setuserDetails(userDetails.data))
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
                                    <input value={cardRechargeId} disabled={true} />
                                </div>
                            </div>
                            <div className='col col-xs-12 col-md-6 col-lg-6'>
                                <div className='row row-bus'>Card No</div>
                                <div className='row row-bus'>
                                    <select id={userId} value={userId} onChange={(e) => { findCard(e.target.value) }}>
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
                            </div >
                            <div className='col col-xs-12 col-md-6 col-lg-6'>
                                <div className='row row-bus'>User Name</div>
                                <div className='row row-bus'>
                                    <input value={cardHolder} readOnly={true}
                                        onChange={(e) => setCardHolder(e.target.value)} />
                                </div>
                            </div>
                            <div className='col col-xs-12 col-md-6 col-lg-6' >
                                <div className='row row-bus'>Current Balance</div>
                                <div className='row row-bus'>
                                    <input value={currentBalance} readOnly={true}
                                        onChange={(e) => setCurrentBalance(e.target.value)} />
                                </div>
                            </div>
                            <div className='col col-xs-12 col-md-6 col-lg-6'>
                                <div className='row row-bus'>Recharge Amount</div>
                                <div className='row row-bus'>
                                    <input type='text' id='rechargeAmount' name='rechargeAmount' value={rechargeAmount} onChange={handleRechargeAmount} placeholder='Enter the Amount'></input>
                                    {formErrors && <span className="error">{formErrors}</span>}
                                </div>
                            </div>
                            <div className='col col-xs-12 col-md-6 col-lg-6' hidden={true}>
                                <div className='row row-bus'>Card Balance</div>
                                <div className='row row-bus'>
                                    <input value={Balance}
                                        onChange={(e) => setBalance(e.target.value)} />
                                </div>
                            </div >
                        </div >
                    </div >
                    <button className='btn-bus' onClick={(e) => { updateCard(e) }}>Update</button>
                    <button className='btn-bus-clr' style={{ paddingBottom: '5%' }} onClick={handleCancel}>Cancel</button>
                </form >
                : null
        }

        <div className='view-list'>Recharge Details </div>
        <div className='container'>
            <Link className="lnk-btn" to="/recharge">Add Recharge</Link>
            <table className="table table-striped table-bus">
                <thead>
                    <tr>
                        <th>Card No</th>
                        <th>Card Holder</th>
                        <th hidden={true}>Current Balance</th>
                        <th>Recharge Amount</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        cardDetails.map(cardDetail => {
                            return (<tr key={cardDetail._id}>
                                <td>{cardDetail.cardNo}</td>
                                <td>{cardDetail.cardHolder}</td>
                                <td hidden={true}>{cardDetail.currentBalance}</td>
                                <td>{cardDetail.rechargeAmount}</td>
                                <td><button className='btn-bus' onClick={() => handleUpdate(cardDetail._id)}>Update</button></td>
                            </tr>)
                        })
                    }
                </tbody>
            </table>
        </div>
    </>
    )
}

export default ViewRechargeDetails;
