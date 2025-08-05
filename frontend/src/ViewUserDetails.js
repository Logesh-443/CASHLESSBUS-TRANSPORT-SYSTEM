import React from 'react';
import axios from 'axios';
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import Header  from './Header';

const ViewUserDetails = () => {
    const [UserDetails, setBusDetails] = useState([])
    const [view, setView] = useState(false)
    const [userId, setUserId] = useState('')
    const [_id, set_Id] = useState('')
    const [userName, setUserName] = useState('')
    const [userMobileNo, setUserMobileNo] = useState('')
    const [userMail, setUserMail] = useState('')
    const [cardNo, setCardNo] = useState('')
    const [cardBalance, setCardBalance] = useState('')
    
    const updateBus = (e) => {
        e.preventDefault()        
        axios.put('http://localhost:3001/putuserDetails/'+_id, {userId,userName,userMobileNo,userMail,cardNo,cardBalance})
        .then( (response) => {
            fetchData();
                console.log("Passenger details updated successfully! ")
                setView(false);
            }
        ).catch((err) => {
            console.log("Something went wrong!", err)
            }
        )          
    }
    const handleDelete=(bid)=>{
        axios.delete('http://localhost:3001/deleteuserDetails/'+bid)
        .then( (response) => {
                console.log("Passenger details deleted successfully! ")
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

    const fetchBusById = (id) => {
        axios.get('http://localhost:3001/getuserById/'+id)
            .then(response => {
                //console.log(response);
                setUserId(response.data.userId)
                setUserName(response.data.userName)
                setUserMobileNo(response.data.userMobileNo)
                setUserMail(response.data.userMail)
                setCardNo(response.data.cardNo)
                setCardBalance(response.data.cardBalance)
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
        axios.get('http://localhost:3001/getuserDetails')
            .then(UserDetails => setBusDetails(UserDetails.data))
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
                                    <input value={userId} disabled={true} />
                                </div>
                            </div>

                            <div className='col col-xs-12 col-md-6 col-lg-6'>
                                <div className='row row-bus'>User Name</div>
                                <div className='row row-bus'>
                                    <input value={userName}
                                        onChange={(e) => setUserName( e.target.value ) }/>
                                </div>
                            </div>
                            <div className='col col-xs-12 col-md-6 col-lg-6'>
                                <div className='row row-bus'>Mobile No</div>
                                <div className='row row-bus'>
                                    <input value={userMobileNo}
                                        onChange={(e) =>  setUserMobileNo(e.target.value) } />
                                </div>
                            </div>
                            <div className='col col-xs-12 col-md-6 col-lg-6'>
                                <div className='row row-bus'>Mail Id</div>
                                <div className='row row-bus'>
                                    <input value={userMail}
                                        onChange={(e) =>  setUserMail(  e.target.value ) } />
                                </div>
                            </div>
                            <div className='col col-xs-12 col-md-6 col-lg-6'>
                                <div className='row row-bus'>Card No</div>
                                <div className='row row-bus'>
                                    <input value={cardNo} disabled={true}
                                        onChange={(e) => setCardNo( e.target.value ) } />
                                </div>
                            </div >
                            <div className='col col-xs-12 col-md-6 col-lg-6'>
                                <div className='row row-bus'>Card Balance</div>
                                <div className='row row-bus'>
                                    <input value={cardBalance}
                                        onChange={(e) => setCardBalance(e.target.value) } />
                                </div>
                            </div >

                        </div >
                    </div >
                    <button className='btn-bus' onClick={(e) => { updateBus(e) }}>Update</button>
                    <button className='btn-bus-clr' style={{ paddingBottom: '5%' }} onClick={handleCancel}>Cancel</button>
                </form >
                : null
        }

        <div className='view-list'>Passenger Details </div>
        
        <div className='container'>
        <Link className="lnk-btn" to="/user">Add Passenger</Link>
            <table className="table table-striped table-bus">
                <thead>
                    <tr>
                        <th>User Name</th>
                        <th>Mobile No</th>
                        <th>Mail Id</th>
                        <th>Card No</th>
                        <th>Card Balance</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        UserDetails.map(UserDetail => {
                            return (<tr key={UserDetail._id}>
                                <td>{UserDetail.userName}</td>
                                <td>{UserDetail.userMobileNo}</td>
                                <td>{UserDetail.userMail}</td>
                                <td>{UserDetail.cardNo}</td>
                                <td>{UserDetail.cardBalance}</td>
                                <td><button className='btn-bus' onClick={() => handleUpdate(UserDetail._id)}>Update</button>
                                    <button className='btn-bus-clr' onClick={()=>handleDelete(UserDetail._id)}>Delete</button></td>
                            </tr>)
                        })
                    }
                </tbody>
            </table>
        </div>
    </>
    )
}

export default ViewUserDetails;
