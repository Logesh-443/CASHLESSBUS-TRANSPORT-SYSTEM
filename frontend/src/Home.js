import React from 'react'
import { useNavigate } from 'react-router';
export const Home = () => {
    let navigate = new useNavigate()
    const handleAdmin = () => {
        navigate('/admin')
    };
    const handleDriver = () => {
        navigate('/driverlogin')
    };
    return (<>
        <div style={{ fontSize: '26px', color: 'brown', paddingTop: '3%' }}>Cashless Bus Transport System</div>
        <div style={{ padding: '5%' }}>
            <div style={{ paddingBottom: '2%' }}>
                <button className='btn btn-primary' onClick={handleAdmin}>Admin Login</button>
            </div>
            <div>
                <button className='btn btn-primary' onClick={handleDriver}>Driver Login</button>
            </div>
        </div>

    </>
    )
}