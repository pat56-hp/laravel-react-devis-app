import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {

  return (
    <div className="header">
        <div className="nav-header">
            <div className="brand-logo">
                <Link to="/">
                    <b>
                    <img src="/assets/images/logo.png" alt="" /> 
                    </b>
                    <span className="brand-title"><img src="../../assets/images/logo-text.png" alt="" /></span>
                </Link>
            </div>
            <div className="nav-control">
                <div className="hamburger"><span className="line"></span> <span className="line"></span> <span className="line"></span>
                </div>
            </div>
        </div>
        <div className="header-content">
            <div className="header-left">
                <ul>
                    <li className="icons position-relative">
                        <Link to="void(0)"><i className="icon-magnifier f-s-16"></i></Link>
                        <div className="drop-down animated bounceInDown">
                            <div className="dropdown-content-body">
                                <div className="header-search" id="header-search">
                                    <form action="#">
                                        <div className="input-group">
                                            <input type="text" className="form-control" placeholder="Search" />
                                            <div className="input-group-append"><span className="input-group-text"><i className="icon-magnifier"></i></span>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
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
