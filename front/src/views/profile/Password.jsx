import React, { useRef, useState } from 'react'
import { tailChase } from 'ldrs'
import axiosClient from '../../axios-client'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function Password() {
    tailChase.register()
    const [isSumbit, setIsSumbit] = useState(false)
    const [errors, setErrors] = useState(null)
    const navigate = useNavigate()
    const passwordRef = useRef()
    const newPasswordRef = useRef()
    const confirmationPasswordRef = useRef()

    //Fonction de soumission des datas
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSumbit(true)
        setTimeout(() => {
            if(passwordRef.current.value.length === 0) {setErrors({error: "Le mot de passe actuel est requis"});setIsSumbit(false);return;}
            if(newPasswordRef.current.value.length === 0) {setErrors({error: "Le nouveau mot de passe est requis"});setIsSumbit(false);return;}
            if(confirmationPasswordRef.current.value.length === 0) {setErrors({error: "La confirmation du nouveau mot de passe est requis"});setIsSumbit(false);return;}

            const payload = {
                'password': passwordRef.current.value,
                'newpassword': newPasswordRef.current.value,
                'confirmation' : confirmationPasswordRef.current.value
            }

            console.log(payload) 
            //soumission des datas a l'API
            axiosClient.post('/password/update', payload)
                .then((data) => {
                    console.log(data)
                    toast.success('Votre mot de passe a bien été mis à jour')
                    setIsSumbit(false)
                    setErrors(null)
                })
                .catch(err => {
                    const resp = err.response
                    if(resp && resp.status == 422) setErrors(resp.data.errors)
                    if(resp && resp.status == 419) setErrors({error : resp.data.message})
                    if(resp && resp.status == 401) navigate('/login')
                    setIsSumbit(false)
                })
        }, 2000)
    }

  return (
    <>
        {
            errors && 
            <div className='alert alert-danger mb-0 mt-2'>
            {
                Object.keys(errors).map(key => (
                <span key={key}>{errors[key]} <br/></span>
                ))
            }
            </div>
        }
        <form onSubmit={handleSubmit}>
            <div className="row form-material">
                <div className="col-md-8">
                    <label className="m-t-20">Mot de passe actuel <span className='text-danger'>*</span></label>
                    <input ref={passwordRef} defaultValue="" type="password" className="form-control" placeholder="********"/>
                </div>
                <div className="col-md-8">
                    <label className="m-t-20">Nouveau mot de passe <span className='text-danger'>*</span></label>
                    <input ref={newPasswordRef} defaultValue="" type="password" className="form-control" placeholder="********"/>
                </div>
                <div className="col-md-8">
                    <label className="m-t-20">Confirmez le nouveau mot de passe <span className='text-danger'>*</span></label>
                    <input ref={confirmationPasswordRef} defaultValue="" type="password" className="form-control" placeholder="********"/>
                </div>
            </div>
            <div className='row'>
                <div className="col-md-6 m-b-15 m-t-15">
                    <button type="submit" className="btn btn-primary">
                        Mettre à jour 
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
    </>
  )
}
