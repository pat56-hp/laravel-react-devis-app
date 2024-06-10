import React from 'react'
import { Link } from 'react-router-dom'
import { useStateContext } from '../contexts/ContextProvider'

export default function Header() {

    const {user} = useStateContext()

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
                     <Link to="/profile"><i className="mdi mdi-account f-s-20" aria-hidden="true"></i> <span className='f-s-15'>{user.name}</span></Link>
                    </li>
                </ul>
            </div>
        </div>
    </div>
  )
}
