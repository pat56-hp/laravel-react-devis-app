import React from 'react'
import Breadcumb from '../../components/Breadcumb'
import { Link, useNavigate } from 'react-router-dom'
import axiosClient from '../../axios-client'
import { useState } from 'react'
import { useEffect } from 'react'
import Loader from '../../components/Loader'
import { toast } from 'react-toastify'
import { useStateContext } from '../../contexts/ContextProvider'

export default function Project() {
    const {user} = useStateContext()
    const [projects, setProjects] = useState([])
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const editProject = (id) => {
        navigate(`/projects/${id}`)
    }

    const getProject = () => {
        setLoading(true)
        axiosClient.get('/projects')
            .then(({data}) => {
                setProjects(data.data)
                setLoading(false)
            })
            .catch(err => {
                const response = err.response
                setLoading(false)
                if (response && response.status == 401) {
                    navigate('/login')
                }
            })
    }

    //Suppression
    const deleteProject = (id) => {
        if (!window.confirm('Êtes-vous sûre de vouloir supprimer ce projet ?')) {
            return            
        }
        setLoading(true)
        axiosClient.delete(`projects/delete/${id}`)
            .then(() => {
                getProject()
                setLoading(false)
                toast.success('Projet supprimé avec succès')
            })
            .catch(err => {
                const response = err.response
                setLoading(false)
                if (response && response.status == 401) {
                    navigate('/login')
                }
            })
    }

    useEffect(() => {
        getProject()
    }, [])

  return (
    <div className='container'>
        <Breadcumb title='Projets' first='Tableau de bord' active='Liste des projets'/>
        <div className='row'>
            <div className='col-md-12'>
                <div className="card">
                    <div className="card-body">
                        <div className="card-title">
                            <div className='d-flex justify-content-between'>
                                <h4>Liste des projets</h4>
                                <Link to='/projects/create' className='btn btn-primary'>
                                    <i className='mdi mdi-plus'></i> Ajouter un projet
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Titre</th>
                                    <th>Catégorie</th>
                                    <th>Client</th>
                                    <th>Statut</th>
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
                                        :
                                        (
                                            projects.length > 0 ?
                                                (
                                                    projects.map((project, index) => (
                                                        <tr key={project.id}>
                                                            <td>{index + 1}</td>
                                                            <td>{project.title}</td>
                                                            <td><span className="badge badge-primary">{project.category?.libelle}</span></td>
                                                            <td>{project.client?.name}</td>
                                                            <td>
                                                                {project.status == 0 && <span className="badge badge-warning">En attente</span>}
                                                                {project.status == 1 && <span className="badge badge-primary">En cours</span>}
                                                                {project.status == 2 && <span className="badge badge-success">Terminé</span>}
                                                            </td>
                                                            <td>{project.created_at} {project.user && user.role == 1 && `par ${project.user.name}`}</td>
                                                            <td>
                                                                <button
                                                                    onClick={() => editProject(project.id)}
                                                                    className='btn btn-rounded btn-secondary p-1'>
                                                                    <i className='mdi mdi-account-edit'></i>
                                                                </button>
                                                                <button
                                                                    onClick={() => deleteProject(project.id)}
                                                                    className='ml-2 btn btn-rounded btn-danger p-1'><i className='mdi mdi-delete'></i></button>
                                                            </td>
                                                        </tr>
                                                    ))
                                                )
                                            :
                                            <tr>
                                                <td colSpan={7} className='text-center'>Aucun projet</td>
                                            </tr>
                                        )
                                }
                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
