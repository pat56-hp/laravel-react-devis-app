import React, { useEffect, useState } from 'react'
import { Link, Navigate, Outlet, useNavigate } from 'react-router-dom'
import { useStateContext } from '../contexts/ContextProvider'
import Header from './Header'
import Sidebar from './Sidebar'
import axiosClient from '../axios-client'
import Loader from './Loader'

export default function DefaultLayout() {

  const el = document.getElementsByTagName('html')
  for (let index = 0; index < el.length; index++) {
    el[index].classList.remove('login-page1');    
  }

  const {token, setUser, setToken} = useStateContext()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    setLoading(true)
    axiosClient.get('/auth/me')
    .then(({data}) => {
      setUser(data)
      setLoading(false)
    })
    .catch(err => {
      const response = err.response
      if (response && response.status === 401) {
        setToken(null)
        setUser(null)
        setLoading(false)
        navigate('/login')
      }
    })
  }, [])

  if (!token) {
      return <Navigate to="/login" />
  }


  return (
    <div id="">
      {
        loading && <Loader />
      }
        {
          !loading && 
          (
            <>
              <Header />
              <Sidebar />
              <div className='content-body'>
                <Outlet/>
              </div>
              <div className="footer">
                <div className="copyright">
                    <p>Copyright &copy; <Link to="/dashboard">DEVIS APP</Link> {new Date(Date.now()).getFullYear()}</p>
                </div>
              </div>
            </>
          )
        }
    </div>
  )
}
