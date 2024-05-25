import React, { useEffect, useRef, useState } from 'react'
import Breadcumb from '../../components/Breadcumb'
import PhoneInput, { isValidPhoneNumber }  from  'react-phone-number-input'
import '../../assets/input.css'
import axiosClient from '../../axios-client'
import { useNavigate } from 'react-router-dom'
import { tailChase } from 'ldrs'
import { toast } from 'react-toastify'

export default function Client() {

    tailChase.register()
    const [errors, setErrors] = useState(null)
    const [isUpdating, setIsUpdating] = useState(false)
    const [loading, setLoadding] = useState(false)
    const [clients, setClients] = useState([])
    const [isSumbit, setIsSumbit] = useState(false)
    const closeRef = useRef()
    const navigate = useNavigate()

    const [client, setClient] = useState({
        id : '',
        name: '',
        phone: '',
        email: '',
    })

    const handleSumbitForm = (e) => {
        e.preventDefault();
        
        setIsSumbit(true)
        setTimeout(() => {
            if (client.name.length === 0) {
                setErrors({
                    name: 'Le nom est requis'
                })
                setIsSumbit(false)
                return
            }
    
            if (!isValidPhoneNumber(client.phone)) {
                setErrors({
                    phone: ['Contact invalide']
                })
                setIsSumbit(false)
                return 
            }
    
            setErrors(null)
            setLoadding(true)
            
            if (!isUpdating) {
                createClient(client)
                setLoadding(false)
                setIsSumbit(false)
            }else{
                editClient(client)
                setLoadding(false)
                setIsSumbit(false)
            }
        }, 2000)
    }

    //Creation du client
    const createClient = (client) => {
        axiosClient.post('/clients/store', client)
        .then(() => {
            getClients()
            setClient({
                id : '',
                name: '',
                phone: '',
                email: '',
            })
            closeRef.current.click()
            //TODO
            toast.success('Client ajouté avec succès')
        }).catch(err => {
            const response = err.response
            if (response) {
                if (response.status === 422) {
                    setErrors(response.data)
                }
                else if (response.status === 419) {
                    setErrors({
                        error: response.message
                    })
                }
                else if (response.status === 401) {
                    navigate('/login')
                }
            }
        })

        
    }

    //Edition du client
    const editClient = (client) => {
        axiosClient.post('/clients/update/'+client.id, client)
        .then(() => {
            getClients()
            setClient({
                id : '',
                name: '',
                phone: '',
                email: '',
            })
            closeRef.current.click()
            //TODO
            toast.success('Client modifié avec succès')
        }).catch(err => {
            const response = err.response
            if (response) {
                if (response.status === 422) {
                    setErrors(response.data)
                }
                else if (response.status === 419) {
                    setErrors({
                        error: response.message
                    })
                }
                else if (response.status === 401) {
                    localStorage.removeItem('ACCESS_TOKEN')
                    navigate('/login')
                }
            }
        })
    }

    const handleDelete = (cl) => {
        if (!window.confirm('Êtes-vous sûre de vouloir supprimer ce client ?')) {
            return 
        }

        setLoadding(true)
        axiosClient.get(`/clients/delete/${cl.id}`)
            .then(() => {
                setLoadding(false)
                getClients()
                toast.success('Client supprimé avec succès')
            }).catch(err => {
                const resp = err.response
                if (resp) {
                    setLoadding(false)
                    if (resp.status === 419) {
                        console.log(resp.data)
                    }else if(resp.status === 401){
                        navigate('/login')
                    }
                }
            })

            
    }

    const openModalToCreate = () => {
        setIsUpdating(false)
        setClient({
            id : '',
            name: '',
            phone: '',
            email: '',
        })
    }

    const openModalToUpdate = (cl) =>{
        setClient(cl)
        setIsUpdating(true)
        //openModal.current.click()
    }

    useEffect(() => {
        getClients()
    }, [])


    const getClients = () => {
        setLoadding(true)
        axiosClient.get('/clients')
            .then(({data}) => {
                setLoadding(false)
                setClients(data.data)
            }).catch(err => {
                const response = err.response

                setLoadding(false)
                if (response && response.status === 401) {
                    navigate('/login')
                }
            })
    }

  return (
    <div className='container'>
        <Breadcumb title='Clients' first='Tableau de bord' active='Liste des clients'/>
        <div className='row'>
            <div className='col-md-12'>
                <div className="card">
                    <div className="card-body">
                        <div className="card-title">
                            <div className='d-flex justify-content-between'>
                                <h4>Liste des clients</h4>
                                <a 
                                    onClick={openModalToCreate}
                                    href='#' 
                                    data-toggle="modal" 
                                    data-target="#newClient"
                                    className='btn btn-primary'>
                                    <i className='mdi mdi-plus'></i> Ajouter un client
                                </a>
                            </div>
                      </div>
                    </div>
                    <div className="table-responsive">
                          <table className="table">
                              <thead>
                                  <tr>
                                      <th>#</th>
                                      <th>Nom</th>
                                      <th>Contact</th>
                                      <th>Nb projet</th>
                                      <th>Date d'enreg.</th>
                                      <th>Actions</th>
                                  </tr>
                              </thead>

                              <tbody>
                                {
                                    loading ? 
                                    <tr>
                                        <td colSpan={6} className='text-center'>
                                        <img src='/speaner.svg' />
                                        </td>
                                    </tr>
                                    : (
                                        clients.length > 0 ? 
                                        clients.map((cl, index) => (
                                            <tr key={cl.id}>
                                                <td>{index+1}</td>
                                                <td>{cl.name}</td>
                                                <td>
                                                    <span className='mdi mdi-phone'></span> {cl.phone} 
                                                    {cl.email && <><br/> <span className='mdi mdi-email'></span> {cl.email}</>}
                                                </td>
                                                <td>{cl.total_project}</td>
                                                <td>{cl.created_at}</td>
                                                <td>
                                                    <button 
                                                        onClick={() => openModalToUpdate(cl)}
                                                        className='btn btn-rounded btn-secondary p-1' 
                                                        data-toggle="modal" 
                                                        data-target="#newClient">
                                                        <i className='mdi mdi-account-edit'></i>
                                                    </button>
                                                    <button onClick={() => handleDelete(cl)} className='ml-2 btn btn-rounded btn-danger p-1'><i className='mdi mdi-delete'></i></button>
                                                </td>
                                            </tr>)
                                        )
                                         : 
                                        <tr>
                                            <td colSpan={6} className='text-center'>Aucun client</td>
                                        </tr>
                                    )

                                    
                                }
                                
                              </tbody>
                          </table>
                      </div>
                </div>
            </div>
        </div>

        <div className="modal fade" id="newClient" style={{display: "none"}} aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">
                      { isUpdating ? 'Modification du client ' : 'Nouveau client' }
                    </h5>
                    <button type="button" className="close" data-dismiss="modal"><span>×</span>
                    </button>
                </div>
                <form onSubmit={handleSumbitForm}>
                  <div className="modal-body">
                    {
                      errors && 
                      (
                        <div className='alert alert-danger mb-0'>
                          {Object.keys(errors).map(key => (
                            <span key={key}>{errors[key]} <br/></span>
                          ))}
                        </div>
                      )
                    }
                    <div className="col-md-12">
                        <label className="m-t-20">Nom <span className='text-danger'>*</span></label>
                        <input 
                          type="text" 
                          className="form-control" 
                          placeholder="Nom & prenom(s)"
                          value={client.name}
                          onChange={(e) => setClient({...client, name: e.target.value})}
                        />
                    </div>
                    <div className="col-md-12">
                        <label className="m-t-20">Contact <span className='text-danger'>*</span></label>
                        <PhoneInput
                            countrySelectProps={{ unicodeFlags: true }}
                            placeholder="+2250707070707"
                            value={client.phone}
                            defaultCountry={!isUpdating && 'CI'}
                            onChange={(e) => setClient({...client, phone: e})}
                            error={client.phone ? (isValidPhoneNumber(client.phone) ? undefined : 'Contact invalide') : 'Le contact est requis'}
                        />
                    </div>
                    <div className="col-md-12">
                        <label className="m-t-20">Email</label>
                        <input 
                          type="email" 
                          className="form-control" 
                          placeholder=" Adresse email"
                          value={client.email}
                          onChange={(e) => setClient({...client, email: e.target.value})}
                        />
                    </div>
                    </div>
                  <div className="modal-footer">
                    <button type="button"  ref={closeRef} className="btn btn-secondary" data-dismiss="modal">Fermer</button>
                    <button type="submit" className="btn btn-primary">
                        Sauvegarder
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
                </form>
            </div>
        </div>
      </div>
    </div>
  )
}
