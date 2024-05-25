import React from 'react'
import Breadcumb from '../../components/Breadcumb'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import axiosClient from '../../axios-client'
import { useEffect } from 'react'
import { tailChase } from 'ldrs'
import Select from 'react-select'
import { toast } from 'react-toastify'

export default function ProjectForm({indice}) {

    tailChase.register()
    const [errors, setErrors] = useState(null)
    const [loading, setLoading] = useState(false)
    const [clientOptions, setCLientOptions] = useState([])
    const [categoryOptions, setCategoryOptions] = useState([])
    const [project, setProject] = useState({
        id: '',
        title: '',
        category_id: '',
        client_id: '',
        file: '',
        description: '',
        status: 0,
        begin_date: '',
        end_date: '',
    })


    const {id} = useParams()
    const navigate = useNavigate()
    
    const _setProject = () => {
        setProject({
            id: '',
            title: '',
            category_id: '',
            client_id: '',
            file: '',
            description: '',
            status: 0,
            begin_date: '',
            end_date: '',
        })
    }

    //Verification de l'extension de fichier
    const handleCheckFile = (e) => {
        const AllowedMimeTypes = ['png', 'jpeg', 'jpg', 'pdf', 'docx', 'doc'];
        const file = e.target.files[0]
        const fileType = file.name.split('.').pop()

        if (!AllowedMimeTypes.includes(fileType)) {
            setErrors({
                error: 'Ce type de fichier n\'est pas pris en charge. Le fichier doit être de type jpg, jpeg, png, pdf ou doc'
            })
        }else{
            setProject({...project, file: file})
        }
    }

    //Soumission des datas
    const handleSubmit = (e) => {
        e.preventDefault();
        
        setLoading(true)
        setErrors(null)
        
        setTimeout(() => {
            if (project.title.length === 0) {
                setErrors({
                    error: 'Le titre du projet est requis'
                })
                setLoading(false)
                return
            }
    
            if (project.category_id.length === 0) {
                setErrors({
                    error: 'La catégorie du projet est requise'
                })
                setLoading(false)
                return
            }
    
            if (project.description.length === 0) {
                setErrors({
                    error: 'Veuillez donner une courte description du projet'
                })
                setLoading(false)
                return
            }

            if (indice === 'new') {
                createProject(project)
            }else{
                updateProject(project)
            }
        }, 2000) 
    }

    //Creation du projet
    const createProject = (project) => {
        axiosClient.post('/projects/store', project, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(() => {
                _setProject()
                setErrors(null)
                setLoading(false)
                toast.success('Enregistrement effectué')
                navigate("/projects")
            })
            .catch(err => {
                const response = err.response
                if (response && response.status === 401) {
                    navigate('/login')
                }
                if (response && response.status === 422) {
                    setErrors(response.data.errors)
                }
                if (response && response.status === 419) {
                    toast.error('Oups, une erreur s\'est produite. L\'enregistrement n\'a pu être éffectué')
                }

                setLoading(false)
            })
    }

    //Modification du projet
    const updateProject = (project) => {
        axiosClient.post(`/projects/update/${project.id}`, project, {
            headers:{
                'Content-Type' : 'multipart/form-data'
            }
        })
            .then(() => {
                _setProject()
                setErrors(null)
                setLoading(false)
                toast.success('Modification effectuée avec succès')
                navigate('/projects')
            })
            .catch(err => {
                const response = err.response
                console.log(response)
                if (response && response.status === 401) {
                    navigate('/login')
                }
                if (response && response.status === 422) {
                    setErrors(response.data.errors)
                }
                if (response && response.status === 419) {
                    toast.error('Oups, une erreur s\'est produite. L\'enregistrement n\'a pu être éffectué')
                }
                setLoading(false)
            })
    }

    //Recuperation des categories de projet
    const getCategories = () => {
        axiosClient.get('/categories')
            .then(({data}) => {
                const catActive = data.data
                    .filter(item => item.status === 1)
                    .map(item => ({
                        value: item.id,
                        label: item.libelle
                    }))
                setCategoryOptions(catActive)
                setErrors(null)
            })
            .catch(err => {
                const response = err.response
                if (response &&response.status === 401) {
                    navigate('/login')
                }
            })
    }

    //Recuperation des clients
    const getClients = () => {
        axiosClient.get('/clients')
            .then(({data}) => {
                const cli = data.data.map(cl => ({
                    value: cl.id,
                    label: cl.name
                }));
                
                setCLientOptions(cli)
                setErrors(null)
            })
            .catch(err => {
                const response = err.response
                if (response &&response.status === 401) {
                    navigate('/login')
                }
            })
    }

    const getProjetByParam = () => {
        if (id) {
            axiosClient.get(`projects/show/${id}`)
                .then(({data}) => {
                    setProject({
                        id: data.data.id,
                        title: data.data.title,
                        category_id: data.data.category_id,
                        client_id: data.data.client_id,
                        description: data.data.description,
                        status: data.data.status,
                        begin_date: data.data.begin_date,
                        end_date: data.data.end_date,
                    })
                })
                .catch(err => {
                    const response = err.response
                    if (response &&response.status === 401) {
                        navigate('/login')
                    }
                })
        }
    }

    //eslint-disable-next-line
    useEffect(() => {
        getCategories()
        getClients()
        getProjetByParam()
    }, [])

  return (
    <div className='container'>
        <Breadcumb title='Projets' first='Tableau de bord' active='Ajouter un projet'/>
        <div className='row'>
            <div className='col-md-12'>
                <div className="card">
                    <div className="card-body">
                        <div className="card-title">
                            <div className='d-flex justify-content-between'>
                                <h4>Ajouter un projet</h4>
                                <Link to='/projects' className='btn btn-primary'>
                                    <i className='mdi mdi-plus'></i> Liste des projets
                                </Link>
                            </div>
                        </div>
                        <form onSubmit={handleSubmit}>
                            {
                                errors &&
                                <div className='alert alert-danger'>
                                    {Object.keys(errors).map((key, index) => (
                                        <span key={index}>{errors[key]} <br /></span> 
                                    ))}
                                    </div>
                            }
                            <div className='row'>
                                <div className='col-md-6 mb-3'>
                                    <label htmlFor='title'>Titre <span className='text-danger'>*</span></label>
                                    <input 
                                        value={project.title}
                                        onChange={(e) => setProject({...project, title: e.target.value})}
                                        type='text' 
                                        className='form-control' 
                                        placeholder='Titre du projet'/>
                                </div>
                                <div className='col-md-6 -b-3'>
                                    <label htmlFor='title'>Catégorie <span className='text-danger'>*</span></label>
                                    <Select 
                                        value={categoryOptions.find(option => option.value === project.category_id)}
                                        options={categoryOptions} 
                                        onChange={(selectOption) => setProject({...project, category_id: selectOption.value})}
                                    />
                                </div>
                                <div className='col-md-6 -b-3'>
                                    <label htmlFor='title'>Client <span className='text-danger'>*</span></label>
                                    <Select 
                                        value={clientOptions.find(option => option.value === project.client_id)}
                                        options={clientOptions} 
                                        onChange={(selectOption) => setProject({...project, client_id: selectOption.value})}
                                    />
                                </div>
                                <div className='col-md-6 mb-3'>
                                    <label htmlFor='title'>Fichier</label>
                                    <input 
                                        onChange={handleCheckFile}
                                        type='file' 
                                        className='form-control' 
                                        placeholder=''/>
                                </div>
                                <div className='col-md-6 mb-3'>
                                    <label htmlFor='title'>Date debut</label>
                                    <input 
                                        value={project.begin_date || ''}
                                        type='date' 
                                        className='form-control'
                                        onChange={(e) => setProject({...project, begin_date: e.target.value})}
                                        />
                                </div>
                                <div className='col-md-6 mb-3'>
                                    <label htmlFor='title'>Date fin</label>
                                    <input 
                                        value={project.end_date || ''}
                                        type='date' 
                                        className='form-control'
                                        onChange={(e) => setProject({...project, end_date: e.target.value})}/>
                                </div>
                                <div className='col-md-6 mb-3'>
                                    <label htmlFor='title'>Statut <span className='text-danger'>*</span></label>
                                    <select 
                                        value={project.status}
                                        className='form-control'
                                        onChange={e => setProject({...project, status: e.target.value})}
                                        >
                                        <option value="0">En attente</option>
                                        <option value="1">En cours</option>
                                        <option value="2">Terminé</option>
                                    </select>
                                </div>
                                
                                <div className='col-md-12 mb-3'>
                                    <label htmlFor='title'>Description <span className='text-danger'>*</span></label>
                                    <textarea 
                                        className='form-control' 
                                        placeholder='Entrer une petite description'
                                        style={{height: '150px'}}
                                        cols={4}
                                        value={project.description}
                                        onChange={e => setProject({...project, description: e.target.value})}
                                        >
                                            
                                    </textarea>
                                </div>
                                <div className="col-md-12 m-b-15 m-t-15">
                                    <button 
                                        type="submit" 
                                        className="btn btn-primary">
                                            <i className='mdi mdi-content-save'></i> 
                                            Valider
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
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
