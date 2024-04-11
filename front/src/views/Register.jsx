import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axiosClient from '../axios-client'
import { useStateContext } from '../contexts/ContextProvider'

export default function Register() {

    const {setUser, setToken} = useStateContext()

    const [errors, setErrors] = useState(null)

    const navigate = useNavigate()

    const nameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()

    const onSubmit = (e) => {
        e.preventDefault()

        setErrors(null)

        const payload = {
            name : nameRef.current.value,
            email : emailRef.current.value,
            password : passwordRef.current.value,
            password_confirmation : passwordConfirmRef.current.value,
        }

        console.log(payload)

        axiosClient.post('/auth/register', payload)
            .then(({data}) => {
                const datas = data
                setUser(datas.user)
                setToken(datas.access_token)
                setErrors(null)
                navigate('/dashboard')
            }).catch(err => {
                const response = err.response
                if (response && response.status === 422) {
                    setErrors(response.data.errors)
                }
            })

    }

  return (
    <>
      <h4 className="text-center m-t-15">Création de compte</h4>
      {
        errors && 
        <div className="alert alert-danger">
            {
                Object.keys(errors).map(key => (
                    <span key={key}>{errors[key]} <br/></span>
                ))
            }
        </div>
      }
      <form className="m-t-30 m-b-30" onSubmit={onSubmit}>
          <div className="form-group">
              <label>Nom & prénom(s)</label>
              <input ref={nameRef} type="text" name='name' className="form-control" placeholder="Nom & prénom(s)" />
          </div>
          <div className="form-group">
              <label>Email</label>
              <input ref={emailRef} type="email" name='email' className="form-control" placeholder="Adresse email" />
          </div>
          <div className="form-group">
              <label>Mot de passe</label>
              <input ref={passwordRef} type="password" name='password' className="form-control" placeholder="Mot de passe" />
          </div>
          <div className="form-group">
              <label>Confirmation du mot de passe</label>
              <input ref={passwordConfirmRef} type="password" name='password-confirmation' className="form-control" placeholder="Confirmez le mot de passe" />
          </div>
          <div className="text-center m-b-15 m-t-15">
              <button type="submit" className="btn btn-primary">S'inscrire</button>
          </div>
      </form>
      <div className="text-center">
          <p className="m-t-30">Vous avez déjà un compte ? <Link to="/login">Connectez-vous</Link></p>
      </div>
    </>
  )
}
