import React from 'react';
import axios from 'axios';
import { useEffect, useState } from "react";
import { Link, useLocation } from 'react-router-dom';
import Header from './Header';
import Modal from 'react-bootstrap/Modal';
import DriverHeader from './DriverHeader';

const ViewEntryDetails = (state) => {

    const location = useLocation();
    const [entryDetails, setEntryDetails] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [_id, set_id] = useState(0);
    const [Amount, setAmount] = useState(0);
    const [driverId, setDriverId] = useState(location.state);

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleUpdate = (bid) => {
        set_id(bid);
        handleShowModal()
    };
    const handleCancel = () => {
        handleCloseModal();
    };
    const handleOk = () => {
        handleCloseModal();
        axios.get('http://localhost:3001/getentryById/' + _id)
            .then((res) => {
                const id= res.data.entrydetails._id
                const busId = res.data.entrydetails.BusNo;
                const SRouteId = res.data.entrydetails.SRouteId;
                const cardNo = res.data.entrydetails.cardId;
                axios.post('http://localhost:3001/postentrybusId', { busId })
                    .then(async (res1) => {
                        const lastItem = res1.data[res1.data.length - 1];
                        const Status = "InActive";
                        const ExitTime = new Date().toLocaleString()
                        const ERouteId = lastItem.RouteId;
                        const ExitStopId = lastItem.StopId;
                        const Amt = calAmount(SRouteId, ERouteId)
                        const promise = Promise.resolve(Amt);
                        const Amount = await promise;
                        axios.put('http://localhost:3001/putentrydetails/' + id, { ERouteId, ExitTime, ExitStopId, Amount, Status })
                            .then((response) => {
                                axios.post('http://localhost:3001/postentrycardId', { cardNo })
                                    .then((resp) => {
                                        const id = resp.data._id
                                        axios.get('http://localhost:3001/getuserById/' + id)
                                            .then((res) => {
                                                const id = res.data._id;
                                                const bal = res.data.cardBalance;
                                                const cardBalance = bal - Amount;
                                                axios.put('http://localhost:3001/putuserBalance/' + id, { cardBalance })
                                                    .then((cres) => {
                                                        console.log(response.data, "submitted");
                                                        fetchData();
                                                    }).catch((err) => {
                                                        console.log(err);
                                                    })
                                            }).catch((err) => {
                                                console.log(err);
                                            })
                                    }).catch((err) => {
                                        console.log(err);
                                    });
                            }).catch((err) => {
                                console.log(err);
                            });
                    }).catch((err) => {
                        console.log(err);
                    })
            }).catch((err) => {
                console.log(err);
            });
    }
    const calAmount = async (s, e) => {
        var RouteId = s;
        const s1 = axios.post('http://localhost:3001/postbusRouteById',
            { RouteId }).then((resp) => resp.data.Price)
            .catch((error) => {
                console.log(error);
            });
        RouteId = e;
        const e1 = axios.post('http://localhost:3001/postbusRouteById',
            { RouteId }).then((resp) => resp.data.Price)
            .catch((error) => {
                console.log(error);
            });
        const promise1 = Promise.resolve(s1);
        const promise2 = Promise.resolve(e1);
        const result1 = await promise1;
        const result2 = await promise2;
        const difference = result2 - result1;
        setAmount(difference);
        return (difference)
    }
    useEffect(() => {
        fetchData();
    }, [])
    const fetchData = () => {
        axios.post('http://localhost:3001/postentrydetails', { driverId })
            .then(entryDetails => {
                setEntryDetails(entryDetails.data)
                // console.log(entryDetails)
            })
            .catch(err => console.log(err))
    }
    return (<>
    <DriverHeader/>
        <div className='view-list'>Entry Details </div>
        <Link className="lnk-btn" to="/entry" style={{ paddingLeft: '15%' }}>Add Entry</Link>
        <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Are you sure you want to perform this action?
                    <button className='btn' onClick={handleOk}>Ok</button>
                    <button className='btn' onClick={handleCancel}>cancel</button>
                </p>
            </Modal.Body>
        </Modal>
        <div className='entry-container'>
            <table className="table table-striped table-entry">
                <thead>
                    <tr>
                        <th>Bus No</th>
                        <th>Card Holder</th>
                        <th>Entry Time</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        entryDetails.map(entryDetail => {
                            return (<tr key={entryDetail._id}>
                                <td>{entryDetail.BusNo}</td>
                                <td>{entryDetail.cardHolder}</td>
                                <td>{entryDetail.EntryTime.toLocaleString()}</td>
                                <td>
                                    <button className='btn-bus' onClick={() => handleUpdate(entryDetail._id)}>Update</button>
                                </td>
                            </tr>)
                        })
                    }
                </tbody>
            </table>
        </div>
    </>
    )
}

export default ViewEntryDetails;