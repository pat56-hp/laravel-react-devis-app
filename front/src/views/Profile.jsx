import React, { useRef, useState } from 'react'
import Breadcumb from '../components/Breadcumb'
import { useStateContext } from '../contexts/ContextProvider'
import axiosClient from '../axios-client'
import { useNavigate } from 'react-router-dom'
import PhoneInput, { isValidPhoneNumber }  from  'react-phone-number-input'
import { tailChase } from 'ldrs'

export default function Profile() {

    tailChase.register()
    const {user, setUser} = useStateContext()
    const [errors, setErrors] = useState(null)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const [isSumbit, setIsSumbit] = useState(false)
    const navigate = useNavigate()
    const nameRef = useRef()
    const emailRef = useRef()
    const phoneRef = useRef()
    const adresseRef = useRef()
    const professionRef = useRef()

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const payload = {
            'name': nameRef.current.value,
            'email' : emailRef.current.value  ,
            'phone' : phoneRef.current.value  ,
            'adresse' : adresseRef.current.value  ,
            'profession' : professionRef.current.value     
        }


        setErrors(null)
        setError(null)
        setIsSumbit(true)

        setTimeout(() => {
            axiosClient.post('/profile', payload)
                .then(({data}) => {
                    setUser(data.user)
                    setError(null)
                    setErrors(null)
                    setSuccess(data.message)
                    setIsSumbit(false)
                })
                .catch(err => {
                    const response = err.response
                    if (response && response.status == 422) {
                        const data = response.data
                        setErrors(data.errors)
                        setIsSumbit(false)
                    }else if (response && response.status == 419) {
                        const data = response.data
                        setError(data.message)
                        setIsSumbit(false)
                    }else if (response && response.status == 401) {
                        navigate('/login')
                    }
                    setIsSumbit(false)
                })
        }, 2000)
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
                                    <label className="m-t-20">Contact <span className='text-danger'>*</span></label>
                                    <PhoneInput
                                        countrySelectProps={{ unicodeFlags: true }}
                                        placeholder="+2250707070707"
                                        value={user.phone}
                                        defaultCountry={'CI'}
                                        ref={phoneRef}
                                        onChange={(e) => phoneRef}
                                        error={user.phone ? (isValidPhoneNumber(user.phone) ? undefined : 'Contact invalide') : 'Le contact est requis'}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="m-t-20">Email <span className='text-danger'>*</span></label>
                                    <input ref={emailRef} type="email" defaultValue={user.email} className="form-control" placeholder="Votre adresse email"/>
                                </div>
                                <div className="col-md-6">
                                    <label className="m-t-20">Profession</label>
                                    <input ref={professionRef} type="text" defaultValue={user.profession} className="form-control" placeholder="Votre profession"/>
                                </div>
                                <div className="col-md-6">
                                    <label className="m-t-20">Adresse</label>
                                    <input ref={adresseRef} type="text" defaultValue={user.adresse} className="form-control" placeholder="Votre adresse"/>
                                </div>
                            </div>
                            <div className='row'>
                                <div className="col-md-6 m-b-15 m-t-15">
                                    <button type="submit" className="btn btn-primary">
                                        Mettre à jour mes informations 
                                        <span className='ml-2'>
                                            {
                                                isSumbit && <l-tail-chase
                                                    size="15"
                                                    speed="1.75" 
                                                    color="white" 
                                                ></l-tail-chase>
                                            }
                                        </span>
                                    </button>
                                </div>
                            </div>
                         </form>
                    </div>
                    <div class="custom-tab-1">
                        <ul class="nav nav-tabs">
                            <li class="nav-item"><a class="nav-link active show" data-toggle="tab" href="#profile">Modifier mes informations</a>
                            </li>
                            <li class="nav-item"><a class="nav-link" data-toggle="tab" href="#password">Modifier mot de passe</a>
                            </li>
                        </ul>
                        <div class="tab-content">
                            <div class="tab-pane fade active show" id="profile" role="tabpanel">
                                <div class="p-t-15">
                                    <h4>This is home title</h4>
                                    <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove.</p>
                                    <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove.</p>
                                </div>
                            </div>
                            <div class="tab-pane fade" id="password">
                                <div class="p-t-15">
                                    <h4>This is profile title</h4>
                                    <p>Raw denim you probably haven't heard of them jean shorts Austin. Nesciunt tofu stumptown aliqua, retro synth master cleanse. Mustache cliche tempor.</p>
                                    <p>Raw denim you probably haven't heard of them jean shorts Austin. Nesciunt tofu stumptown aliqua, retro synth master cleanse. Mustache cliche tempor.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
