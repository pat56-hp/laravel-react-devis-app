import React from 'react'
import { Link, Navigate, Outlet } from 'react-router-dom'
import { useStateContext } from '../contexts/ContextProvider'

export default function GuestLayout() {
  const {token} = useStateContext()

  if (token) {
    return <Navigate to="/" />
  }

  const el = document.getElementsByTagName('html')

  for (let index = 0; index < el.length; index++) {
    el[index].classList.add('login-page1');
    el[index].classList.add('h-100');
    
  }
  return (
    <>
      <div className="login-bg h-100">
        <div className="container h-100">
            <div className="row justify-content-center h-100">
                <div className="col-xl-6">
                    <div className="form-input-content">
                        <div className="card">
                            <div className="card-body">
                                <div className="logo text-center">
                                    <Link to="/dashboard">
                                        {/* <img src="/assets/images/f-logo.png" alt="" /> */}
                                        <h2>DEVIS APP</h2>
                                    </Link>
                                </div>
                                <Outlet/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </>
  )
}
