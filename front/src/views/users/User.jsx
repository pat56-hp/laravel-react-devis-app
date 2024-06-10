import React, { useEffect, useRef, useState } from 'react'
import Breadcumb from '../../components/Breadcumb'
import axiosClient from '../../axios-client'
import { useNavigate } from 'react-router-dom'
import Paginator from '../Paginator'
import { toast } from 'react-toastify'
import PhoneInput, { isValidPhoneNumber }  from  'react-phone-number-input'

export default function User() {

  const navigate = useNavigate()
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const nameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const professionRef = useRef()
  const [errors, setErrors] = useState(null)
  const closeRef = useRef()
  const updatingRef = useRef()
  const [isUpdating, setIsUpdating] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)
  const [user, setUser] = useState({
    id: '',
    name: '',
    email: '',
    password: '',
    profession: '',
    phone: '',
    adresse: '',
    role: 0,
    status : true
  })

  const handleSumbit = (e) =>{
    e.preventDefault();
    if (nameRef.current.value.length == 0) {
      setErrors({
        "name" : "Le nom est requis"
      })

      return
    }

    if (emailRef.current.value.length == 0) {
      setErrors({
        "email" : 'L\'email est requis'
      })

      return
    }

    if (passwordRef.current.value.length == 0 && !isUpdating) {
      setErrors({
        "password" : 'Le mot de passe est requis'
      })

      return
    }


    setErrors(null)
    setLoading(true)

    if (!isUpdating) {
      axiosClient.post('/users/store', user)
        .then(() => {
            getUsers()
            setUser({
              id: '',
              name: '',
              email: '',
              profession: '',
              phone: '',
              adresse: '',
              password: '',
              role: 0,
              status : true
            })
            setIsUpdating(false)
            setLoading(false)
            closeRef.current.click()
            toast.success('Utilisateur ajouté avec succès')
        })
        .catch(err => {
          const response = err.response
          if (response) {
            if (response.status == 419) {
              setErrors(response.data)
            }
  
            if (response.status == 422) {
              setErrors(response.data.errors)
            }

            if (response.status == 401) {
              closeRef.current.click()
              navigate('/login')
            }
          }

          setLoading(false)
        })
    }else{
      axiosClient.post(`/users/update/${user.id}`, user)
        .then(() => {
            getUsers()
            setUser({
              id: '',
              name: '',
              email: '',
              profession: '',
              password: '',
              phone: '',
              adresse: '',
              role: 0,
              status : true
            })
            setIsUpdating(false)
            setLoading(false)
            closeRef.current.click()
            toast.success('Utilisateur modifié avec succès')
        })
        .catch(err => {
          const response = err.response
          if (response) {
            if (response.status == 419) {
              setErrors(response.data)
            }
  
            if (response.status == 422) {
              setErrors(response.data.errors)
            }

            if (response.status == 401) {
              localStorage.removeItem('ACCESS_TOKEN')
              closeRef.current.click()
              navigate('/login')
            }
          }
          setLoading(false)
        })
    }
  }

  const editState = (user) => {
    if (!window.confirm(`Êtes-vous sûre de vouloir ${ user.status == 1 ? 'désactiver' : 'activer' } cet utilisateur ?`)) {
        return
    }

    setLoading(true)
    axiosClient.get('users/edit-state/'+user.id)
    .then(() => {
      setLoading(false)
      getUsers()
      toast.success(`Utilisateur ajouté ${ user.status == 1 ? 'désactivé' : 'activé' } avec succès`)
    })
    .catch(err => {
      const response = err.response
      if (response && response.status == 401) {
        navigate('/login')
      }
      setLoading(false)
    })
  }

  const deleteUser = (user) => {
    if (!window.confirm("Êtes-vous sûre de vouloir supprimer cet utilisateur ?")) {
      return 
    }
    setLoading(true)
    axiosClient.get(`/users/delete/${user.id}`)
      .then(() => {
        setLoading(false)
        getUsers()
        toast.success('Utilisateur supprimé avec succès')
      })
      .catch(err => {
        const response = err.response
        if (response && response.status == 401) {
          localStorage.removeItem('ACCESS_TOKEN')
          navigate('/login')
        }

        setLoading(false)
      })
  }

  const onpenModalNew = () => {
    setUser({
      id: '',
      name: '',
      email: '',
      profession: '',
      password: '',
      phone: '',
      adresse: '',
      role: 0,
      status : true
    })
    setIsUpdating(false)
    setErrors(null)
  }

  const openModalToUpdate = (u) => {
    console.log(u)
    setIsUpdating(true)
    setUser({
      id: u.id,
      name: u.name,
      email: u.email,
      profession: u.profession ? u.profession : '' ,
      phone: u.phone ? u.phone : '' ,
      adresse: u.adresse ? u.adresse : '' ,
      password: '',
      role: u.role,
      status : u.status == 1 ? true : false
    })
    setErrors(null)
  }

  const getUsers = () => {
    setLoading(true)
    axiosClient.get(`/users?page=${currentPage}`)
      .then(({data}) => {
        setUsers(data.data)
        setCurrentPage(data.meta.current_page)
        setTotalPage(data.meta.last_page)
        setLoading(false)
      })
      .catch(err => {
        setLoading(false)
        const response = err.response
        if (response.status == 401) {
          navigate('/login')
        }
        
      })
  }

  const getPageOfPaginate = (pageNumber) => {
    setLoading(true)
    axiosClient.get(`users?page=${pageNumber}`)
      .then(({data}) => {
        setUsers(data.data)
        setCurrentPage(data.meta.current_page)
        setTotalPage(data.meta.last_page)
        setLoading(false)
      })
      .catch(err => {
        setLoading(false)
        const response = err.response
        if (response.status == 401) {
          navigate('/login')
        }
        
      })
  }

  const handleChangeChecked = (e) => {
    setUser({...user, status: !user.status})
  }

  // eslint-disable-next-line
  useEffect(() => {
    getUsers()
  }, [])

  return (
    <div className="container">
      <Breadcumb title='Utilisateurs' first='Tableau de bord' active='Liste des utilisateurs'/>
      <div className="row">
          <div className="col-lg-12">
              <div className="card">
                  <div className="card-body">
                      <div className="card-title">
                        <div className='d-flex justify-content-between'>
                          <h4>Liste des utilisateurs</h4>
                          <a 
                            onClick={onpenModalNew}
                            ref={updatingRef}
                            href='#' 
                            className='btn btn-primary' 
                            data-toggle="modal" 
                            data-target="#newUser"><i className='mdi mdi-plus'></i> Ajouter un utilisateur</a>
                        </div>
                      </div>
                      <div className="table-responsive">
                          <table className="table">
                              <thead>
                                  <tr>
                                      <th>#</th>
                                      <th>Nom</th>
                                      <th>Contact</th>
                                      <th>Rôle</th>
                                      <th>Statut</th>
                                      <th>Date d'enreg.</th>
                                      <th>Actions</th>
                                  </tr>
                              </thead>

                              <tbody>

                                {
                                  loading && 
                                  <tr>
                                    <td colSpan={6} className='text-center'>
                                      <img src='/speaner.svg' />
                                    </td>
                                  </tr>
                                }
                                {
                                  !loading && users && users.map((user, index) => (
                                      <tr key={user.id}>
                                        <th>{index+1}</th>
                                        <td>{user.name}</td>
                                        <td>
                                          {user.email && <><i className='mdi mdi-email'></i> {user.email} <br/></>}
                                          {user.phone && <><i className='mdi mdi-phone'></i> {user.phone} <br/></>}
                                        </td>
                                        <td>
                                          {user.role == 1 && <span className='badge badge-primary'>Administrateur</span>}
                                          {user.role == 0 && <span className='badge badge-primary'>Utilisateur</span>}
                                        </td>
                                        <td>
                                          { 
                                            user.status == 1 && <span className="badge badge-success">Actif</span>
                                          }
                                          { 
                                            user.status == 0 && <span className="badge badge-warning">Inactif</span>
                                          }
                                        </td>
                                        <td>{user.created_at}</td>
                                        <td>
                                          <button 
                                            className='btn btn-rounded btn-secondary p-1' 
                                            onClick={(e) => openModalToUpdate(user)} 
                                            data-toggle="modal" 
                                            data-target="#newUser">
                                            <i className='mdi mdi-account-edit'></i>
                                          </button>
                                          <button onClick={() => editState(user)} className='ml-2 btn btn-rounded btn-warning p-1' title={user.status == 1 ? 'Désactiver' : 'Activer'}>
                                            <i className={user.status == 1 ? 'mdi mdi-lock-open' : 'mdi mdi-lock'}></i>
                                          </button>
                                          <button onClick={(e) => deleteUser(user)} className='ml-2 btn btn-rounded btn-danger p-1'><i className='mdi mdi-delete'></i></button>
                                        </td>
                                    </tr>
                                  ))
                                }
                              </tbody>
                          </table>
                      </div>
                      {
                        totalPage > 1 && 
                        <Paginator 
                          currentPage = {currentPage}
                          totalPage = {totalPage}
                          getPageOfPaginate = {getPageOfPaginate}
                        />
                      }
                  </div>
              </div>
          </div>
      </div>

      <div className="modal fade" id="newUser" style={{display: "none"}} aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">
                      {
                        isUpdating ? `Modifier l'utilisateur` : 'Ajouter un utilisateur'
                      }
                    </h5>
                    <button type="button" className="close" data-dismiss="modal"><span>×</span>
                    </button>
                </div>
                <form onSubmit={handleSumbit}>
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
                    <div className='row'>

                      <div className="col-md-6">
                          <label className="m-t-20">Nom <span className='text-danger'>*</span></label>
                          <input 
                            ref={nameRef} 
                            type="text" 
                            className="form-control" 
                            placeholder="Nom & prenom(s)"
                            value={user.name}
                            onChange={(e) => setUser({...user, name: e.target.value})}
                          />
                      </div>
                      <div className="col-md-6">
                          <label className="m-t-20">Profession</label>
                          <input 
                            ref={professionRef} 
                            type="text" 
                            className="form-control" 
                            placeholder="Profession"
                            value={user.profession}
                            onChange={(e) => setUser({...user, profession: e.target.value})}
                          />
                      </div>
                      <div className="col-md-6">
                          <label className="m-t-20">Contact <span className='text-danger'>*</span></label>
                          <PhoneInput
                              countrySelectProps={{ unicodeFlags: true }}
                              placeholder="+2250707070707"
                              value={user.phone}
                              defaultCountry={'CI'}
                              onChange={(e) => setUser({...user, phone: e})}
                              error={user.phone ? (isValidPhoneNumber(user.phone) ? undefined : 'Contact invalide') : 'Le contact est requis'}
                          />
                      </div>
                      <div className="col-md-6">
                          <label className="m-t-20">Email <span className='text-danger'>*</span></label>
                          <input 
                            ref={emailRef} 
                            type="email" 
                            className="form-control" 
                            placeholder=" Adresse email"
                            value={user.email}
                            onChange={(e) => setUser({...user, email: e.target.value})}
                          />
                      </div>
                      <div className="col-md-6">
                          <label 
                            className="m-t-20">
                              Mot de passe 
                              {
                                !isUpdating && <span className='text-danger'>*</span>
                              }
                            </label>
                          <input 
                            ref={passwordRef} 
                            type="password" 
                            className="form-control" 
                            placeholder="Mot de passe"
                            onChange={(e) => setUser({...user, password: e.target.value})}
                            value={user.password}
                          />
                            
                      </div>
                      <div className="col-md-6">
                          <label className="m-t-20">Adresse <span className='text-danger'>*</span></label>
                          <input type="text" value={user.adresse} onChange={e => setUser({...user, adresse : e.target.value})} className="form-control" placeholder="Votre adresse"/>
                      </div>
                      <div className='col-md-6'>
                        <label className='m-t-20'>Rôle</label>
                        <select 
                            value={user.role}
                            className='form-control'
                            onChange={e => setUser({...user, role: e.target.value})}
                            >
                            <option value="0">Utilisateur</option>
                            <option value="1">Administrateur</option>
                        </select>
                      </div>
                    </div>
                    {
                      !isUpdating &&
                      <div className='col-md-12'>
                        <div className="form-check m-t-20">
                          <input className="form-check-input" id='status' type="checkbox" defaultChecked={user.status} onChange={handleChangeChecked} />
                          <label className="form-check-label" htmlFor="status">Activer le compte</label>
                        </div>
                      </div>
                    }
                  </div>
                  <div className="modal-footer">
                      <button type="button"  ref={closeRef} className="btn btn-secondary" data-dismiss="modal">Fermer</button>
                      <button type="submit" className="btn btn-primary">Sauvegarder</button>
                  </div>
                </form>
            </div>
        </div>
      </div>
    </div>
  )
}



