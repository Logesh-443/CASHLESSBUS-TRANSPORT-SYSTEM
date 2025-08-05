import React from 'react'
import { Link } from 'react-router-dom'
const DriverHeader = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark navbar-dark-cl">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <p style={{ paddingTop: '5%' }}>Cashless Bus Transport System</p>
                    </div>
                    <ul className="nav navbar-nav navbar-right">
                
                        <li className="nav-item">
                            <Link className="lnk-head" to="/">Logout</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}
export default DriverHeader