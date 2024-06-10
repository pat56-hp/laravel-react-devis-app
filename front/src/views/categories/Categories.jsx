import React, { useEffect, useRef, useState } from 'react'
import Breadcumb from '../../components/Breadcumb'
import CategoryModal from './CategoryModal'
import axiosClient from '../../axios-client'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function Categories() {

    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(false)
    const [isUpdating, setIsUpdating] = useState(false)
    const [errors, setErrors] = useState(null)
    const closeRef = useRef()
    const navigate = useNavigate()
    const [categorie, setCategorie] = useState({
        id: '',
        libelle: '',
        status: false,
    })

    //Mise a jour des inputs
    const _setCategorie = () => {
        setCategorie({
            id: '',
            libelle: '',
            status: false,
        })
    }

    //Envoie des data
    const handleSumbit = (e) => {
        e.preventDefault();

        if (categorie.libelle.length == 0) {
            setErrors({
                error: 'Le libéllé est requis'
            })
            return
        }

        setLoading(true) //Loading des data
        if (!isUpdating) {
            axiosClient.post('/categories/store', categorie)
                .then(() => {
                    getCategories()
                    _setCategorie()
                    setLoading(false)
                    setErrors(null)
                    closeRef.current.click()
                    toast.success('Catégorie ajoutée avec succès')
                })
                .catch(err => {
                    const response = err.response
                    setLoading(false)
                    if (response) {
                        if (response.status == 422) {
                            setErrors(response.data.errors)
                        }
                        if (response.status == 419) {
                            setErrors({
                                error: response.data.message
                            })
                        }
                        if (response.status == 401) {
                            navigate('/login')
                        }
                    }
                })
        }else{
            axiosClient.put(`categories/update/${categorie.id}`, categorie)
                .then(({data}) => {
                    getCategories()
                    _setCategorie()
                    setLoading(false)
                    setErrors(null)
                    closeRef.current.click()
                    toast.success('Catégorie modifiée avec succès')
                })
                .catch(err => {
                    const response = err.response
                    setLoading(false)
                    if (response) {
                        if (response.status == 422) {
                            setErrors(response.data.errors)
                        }
                        if (response.status == 419) {
                            setErrors({
                                error: response.data.message
                            })
                        }
                        if (response.status == 401) {
                            navigate('/login')
                        }
                    }
                })
        }
    }

    //Ouverture de modal pour l'ajout
    const openModalToCreate = () => {
        setCategorie({
            id: '',
            libelle: '',
            status: false,
        })
        setIsUpdating(false)
    }

    //Ouverture de modal pour la modification
    const openModalToUpdate = (cat) => {
        setCategorie({
            id: cat.id,
            libelle: cat.libelle,
            status: cat.status == 1 ? true : false,
        })
        setIsUpdating(true)
    }

    //Suppression d'une categorie
    const deleteCategory = (cat) => {
        if (!window.confirm('Êtes-vous sûre de vouloir supprimer cette catégorie ? Ceci affectera vos projets et facturations.')) {
            return
        }
        setLoading(true)
        axiosClient.delete(`categories/delete/${cat.id}`)
            .then(() => {
                getCategories()
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

    //Modification du statut
    const editStatus = (cat) => {
        const libEdit = cat.status == 1 ? 'désactiver' : 'activer'
        if (!window.confirm(`Êtes-vous sûre de vouloir ${libEdit} de cette catégorie ?`)) {
            return
        }

        setLoading(true)
        axiosClient.get(`categories/edit-state/${cat.id}`)
            .then(() => {
                getCategories()
                setLoading(false)
            })
            .catch(err => {
                const resp = err.response
                setLoading(false)
                if (resp && resp.status == 401) {
                    navigate('/login')
                }
            })
    }

    //Recuperation des categories
    const getCategories = () => {
        setLoading(true)
        axiosClient.get('/categories')
            .then(({data}) => {
                console.log(data)
                setCategories(data.data)
                setLoading(false)
            })
            .catch(err => {
                const resp = err.response
                setLoading(false)
                if (resp && resp.status == 401) {
                    navigate('/login')
                }
            })
    }

    useEffect(() => {
        getCategories()
    }, [])

  return (
    <div className='container'>
        <Breadcumb title='Catégories' first='Tableau de bord' active='Liste des catégories de projet'/>
        <div className='row'>
            <div className='col-md-12'>
                <div className="card">
                    <div className="card-body">
                        <div className="card-title">
                            <div className='d-flex justify-content-between'>
                                <h4>Liste des catégories</h4>
                                <a 
                                    onClick={openModalToCreate}
                                    href='#' 
                                    className='btn btn-primary'
                                    data-toggle="modal" 
                                    data-target="#newCategorie">
                                    <i className='mdi mdi-plus'></i> Ajouter une catégorie
                                </a>
                            </div>
                    </div>
                    </div>
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Titre</th>
                                    <th>Total projet</th>
                                    <th>Statut</th>
                                    <th>Date d'enreg.</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    loading ? (
                                        <tr>
                                            <td colSpan={6} className='text-center'>
                                            <img src='/speaner.svg' />
                                            </td>
                                        </tr>
                                    ) : 
                                    (
                                        categories.length > 0 ? 
                                            (
                                                categories.map((cat, index) => (
                                                    <tr key={cat.id}>
                                                        <td>{index+1}</td>
                                                        <td>{cat.libelle}</td>
                                                        <td>{cat.total_projet}</td>
                                                        <td>
                                                            <span 
                                                                className={`badge badge-${cat.status == 1 ? 'success' : 'danger'}`}
                                                            >
                                                                {cat.status == 1 ? 'Active' : 'Inactive'}
                                                            </span>
                                                        </td>
                                                        <td>{cat.created_at}</td>
                                                        <td>
                                                            <button 
                                                                onClick={() => openModalToUpdate(cat)}
                                                                data-toggle="modal" 
                                                                data-target="#newCategorie"
                                                                className='btn btn-rounded btn-secondary p-1'>
                                                                <i className='mdi mdi-account-edit'></i>
                                                            </button>
                                                            <button 
                                                                onClick={() => editStatus(cat)}
                                                                className='ml-2 btn btn-rounded btn-warning p-1' title={cat.status == 1 ? 'Désactiver' : 'Activer'}>
                                                                <i className={ cat.status == 1 ? 'mdi mdi-lock-open' : 'mdi mdi-lock'}></i>
                                                            </button>
                                                            <button onClick={() => deleteCategory(cat)} className='ml-2 btn btn-rounded btn-danger p-1'><i className='mdi mdi-delete'></i></button>
                                                        </td>
                                                    </tr>
                                                ))
                                            )
                                        :
                                        (
                                            <tr>
                                                <td colSpan={6} className='text-center'>
                                                    Aucune catégorie
                                                </td>
                                            </tr>
                                        )
                                    )
                                }
                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <CategoryModal 
            isUpdating = {isUpdating} 
            categorie = {categorie} 
            setCategorie={setCategorie} 
            handleSumbit={handleSumbit}
            errors = {errors}
            closeRef = {closeRef}
        />
    </div>
  )
}
