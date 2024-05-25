import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {

  return (
    <div className="header">
        <div className="nav-header">
            <div className="brand-logo mt-2">
                <Link to="/">
                    <b className=''>
                    {/* <img src="/assets/images/logo.png" alt="" />  */}
                    DEVIS APP
                    </b>
                    {/* <span className="brand-title"><img src="../../assets/images/logo-text.png" alt="" /></span> */}
                </Link>
            </div>
            <div className="nav-control">
                <div className="hamburger"><span className="line"></span> <span className="line"></span> <span className="line"></span>
                </div>
            </div>
        </div>
        <div className="header-content">
            
            <div className="header-right">
                <ul>
                    <li className="icons">
                        <Link to="/profile"><i className="mdi mdi-account f-s-20" aria-hidden="true"></i></Link>
                    </li>
                </ul>
            </div>
        </div>
    </div>
  )
}
