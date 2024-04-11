import React, { useRef, useState } from 'react'
import Breadcumb from '../components/Breadcumb'
import { useStateContext } from '../contexts/ContextProvider'
import axiosClient from '../axios-client'
import { useNavigate } from 'react-router-dom'

export default function Profile() {

    const {user, setUser} = useStateContext()

    const [errors, setErrors] = useState(null)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const navigate = useNavigate()
    const nameRef = useRef()
    const emailRef = useRef()

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const payload = {
            'name': nameRef.current.value,
            'email' : emailRef.current.value       
        }

        //console.log(payload);
        setErrors(null)
        setError(null)

        axiosClient.post('/profile', payload)
            .then(({data}) => {
                setUser(data.user)
                setError(null)
                setErrors(null)
                setSuccess(data.message)
            })
            .catch(err => {
                const response = err.response
                if (response && response.status === 422) {
                    const data = response.data
                    console.log(data)
                    setErrors(data.errors)
                }else if (response && response.status === 419) {
                    const data = response.data
                    setError(data.message)
                }else if (response && response.status === 401) {
                    navigate('/login')
                }
            })
    }

  return (
    <div className="container">
         <Breadcumb title='Modifer mon profil' first='Tableau de bord' active='Mon profil'/>
         <div className="row">
            <div className="col-12">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Mon profil</h4>
                        <h6 className="card-subtitle">Cette section est utilisée pour modifier votre profil</h6>
                        {
                            (errors &&
                            <div className='alert alert-danger mb-0 mt-2'>
                            {
                                Object.keys(errors).map(key => (
                                <span key={key}>{errors[key]} <br/></span>
                                ))
                            }
                            </div>) ||
                            (
                            error && 
                            <div className='alert alert-danger mb-0 mt-2'>
                                <span>{error}</span>
                            </div>
                            )
                            || 
                            (
                            success && 
                            <div className='alert alert-success mb-0 mt-2'>
                                <span>{success}</span>
                            </div>
                            )
                        }
                        <form onSubmit={handleSubmit}>
                            <div className="row form-material">
                                <div className="col-md-6">
                                    <label className="m-t-20">Nom <span className='text-danger'>*</span></label>
                                    <input ref={nameRef} type="text" defaultValue={user.name} className="form-control" placeholder="Votre nom"/>
                                </div>
                                <div className="col-md-6">
                                    <label className="m-t-20">Email <span className='text-danger'>*</span></label>
                                    <input ref={emailRef} type="email" defaultValue={user.email} className="form-control" placeholder="Votre adresse email"/>
                                </div>
                                <div className="col-md-6 m-b-15 m-t-15">
                                    <button type="submit" className="btn btn-primary">Mettre à jour mes informations</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
