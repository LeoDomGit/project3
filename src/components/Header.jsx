import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

function Header() {
    useEffect(()=>{
        if(!localStorage.getItem('email') || localStorage.getItem('email')==null){
            window.location.replace('/');
        }
    },[])
  return (
    <>
        <nav id="sidebar" className="sidebar js-sidebar">
            <div className="sidebar-content js-simplebar">
                <a className="sidebar-brand" href="index.html">
                    
                    <span className="align-middle">Dashboard</span>
                </a>

                <ul className="sidebar-nav">
                    <li className="sidebar-header">
                        {/* Pages */}
                    </li>

                    <li className="sidebar-item">
                        <Link style={{'textDecoration':'none'}} className="sidebar-brand" to="/users">
                    
                        <i className="bi bi-box p-2"></i> <span
                                className="align-middle"> Tài khoản</span>
                        </Link>
                    </li>

                    <li className="sidebar-item">
                        <Link style={{'textDecoration':'none'}} className="sidebar-brand" to="/edu">
                    
                        <i className="bi bi-box2 p-2"></i> <span
                                className="align-middle"> Đào tạo</span>
                        </Link>
                    </li>
                    <li className="sidebar-item">
                        <Link style={{'textDecoration':'none'}} className="sidebar-brand" to="/logout">
                    
                        <i className="bi bi-box2 p-2"></i> <span
                                className="align-middle">Đăng xuất</span>
                        </Link>
                    </li>

                   
                </ul>
            </div>
        </nav>
    </>
  )
}

export default Header