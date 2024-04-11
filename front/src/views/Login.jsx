import React, { useRef, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axiosClient from '../axios-client'
import { useStateContext } from '../contexts/ContextProvider'
import { toast } from 'react-toastify'
import { tailChase } from 'ldrs'

export default function Login() {

  tailChase.register()
  const [loading, setLoading] = useState(false)
  const {setToken, setUser} = useStateContext()
  const navigate = useNavigate()

  const emailRef = useRef()
  const passwordRef = useRef()

  const [errors, setErrors] = useState(null)
  const [unAuthorised, setUnAuthorised] = useState(null)


  const onSubmit = (e) => {
    e.preventDefault()
    setErrors(null)
    setLoading(true)

    setTimeout(() => {
      const payload = {
        email : emailRef.current.value,
        password : passwordRef.current.value
      }
  
      axiosClient.post('/auth/login', payload)
        .then(({data}) => {
          const el = data
          setToken(data.access_token)
          setUser(data.user)
          setErrors(null)
          setUnAuthorised(null)
          setLoading(false)
          toast.success(`Heureux de vous revoir ${data.user.name}`);
          navigate('/dashboard')
        })
        .catch(err => {
          const response = err.response
          if (response && response.status === 422) {
            setErrors(response.data.errors)
          }else if(response && response.status === 401) {
            setUnAuthorised(response.data.error)
          }
          setLoading(false)
        })
    }, 2000)

  }

  return (
    <>
      <h4 className="text-center m-t-15">Connectez-vous à votre compte</h4>
      {
        (errors &&
        <div className='alert alert-danger'>
          {
            Object.keys(errors).map(key => (
              <span key={key}>{errors[key]} <br/></span>
            ))
          }
        </div>) ||
        (
          unAuthorised && 
          <div className='alert alert-danger'>
              <span>{unAuthorised}</span>
          </div>
        )
      }
      <form className="m-t-30 m-b-30" onSubmit={onSubmit}>
          <div className="form-group">
              <label>Email</label>
              <input ref={emailRef} type="email" name='email' className="form-control" placeholder="Adresse email" />
          </div>
          <div className="form-group">
              <label>Mot de passe</label>
              <input ref={passwordRef} type="password" name='password' className="form-control" placeholder="Mot de passe" />
          </div>
          <div className="form-row">
              <div className="form-group col-md-6">
                  <div className="form-check ">
                      <input className="form-check-input" type="checkbox" id="basic_checkbox_1" />
                      <label className="form-check-label" htmlFor="basic_checkbox_1">Se souvenir de moi</label>
                  </div>
              </div>
              <div className="form-group col-md-6 text-right">
                <Link to="#">Mot de passe oublié ?</Link>
              </div>
          </div>
          <div className="text-center m-b-15 m-t-15">
              <button type="submit" className="btn btn-primary">
                Se connecter
                <span className='ml-2'>
                  {
                      loading && <l-tail-chase
                          size="15"
                          speed="1.75" 
                          color="white" 
                      ></l-tail-chase>
                  }
                  </span>
              </button>
          </div>
      </form>
      <div className="text-center">
          <p className="m-t-30">Pas encore de compte ? <Link to="/register">Inscrivez-vous</Link></p>
      </div>
    </>
  )
}
