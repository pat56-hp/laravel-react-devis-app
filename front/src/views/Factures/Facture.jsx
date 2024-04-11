import React, { useEffect, useState } from 'react'
import Breadcumb from '../../components/Breadcumb'
import { Link, useNavigate } from 'react-router-dom'
import axiosClient from '../../axios-client'

export default function Facture() {
    const [factures, setFactures] = useState([])
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const generatePdf = (id) => {
        navigate(`/factures/${id}/pdf`)
    }

    const getFacture = () => {
        setLoading(true)
        axiosClient.get('/factures')
            .then(({data}) => {
                setFactures(data.data)
                setLoading(false)
            })
            .catch(err => {
                const resp = err.response
                if (resp && resp.status === 401) {
                    navigate('/login')
                }
                setLoading(false)
            })
    }

    // eslint-disable-next-line
    useEffect(() => {
        getFacture()
    }, [])

  return (
    <div className='container'>
        <Breadcumb title='Factures' first='Tableau de bord' active='Liste des factures'/>
        <div className='row'>
            <div className='col-md-12'>
                <div className="card">
                    <div className="card-body">
                        <div className="card-title">
                            <div className='d-flex justify-content-between'>
                                <h4>Liste des factures</h4>
                                <Link to='/factures/create' className='btn btn-primary'>
                                    <i className='mdi mdi-plus'></i> Ajouter une facture
                                </Link>
                            </div>
                        </div>
                    </div>
                
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Ref</th>
                                    <th>Projet</th>
                                    <th>Client</th>
                                    <th>Montant</th>
                                    <th>Statut</th>
                                    <th>Date d'enreg.</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    loading ?
                                    <tr>
                                        <td colSpan={8} className='text-center'>
                                        <img src='/speaner.svg' />
                                        </td>
                                    </tr>
                                    :
                                    (
                                        factures.length > 0 ?
                                            (
                                                factures.map((facture, index) => (
                                                    <tr key={index}>
                                                        <td>{facture.ref}</td>
                                                        <td>{facture.project}</td>
                                                        <td>{facture.client}</td>
                                                        <td>{facture.total}</td>
                                                        <td>
                                                            {facture.status === 0 && <span className="badge badge-warning">En attente</span>}
                                                            {facture.status === 1 && <span className="badge badge-primary">En cours</span>}
                                                            {facture.status === 2 && <span className="badge badge-success">Terminé</span>}
                                                        </td>
                                                        <td>{facture.created_at}</td>
                                                        <td>
                                                            <button
                                                                title='Modifier'
                                                                onClick={() => navigate('/factures/' + facture.id)}
                                                                className='btn btn-rounded btn-secondary p-1'>
                                                                <i className='mdi mdi-pencil'></i>
                                                            </button>
                                                            <button
                                                                onClick={() => generatePdf(facture.id)}
                                                                title='Imprimer'
                                                                className='ml-2 btn btn-rounded btn-secondary p-1'>
                                                                <i className='mdi mdi-printer'></i>
                                                            </button>
                                                            <button
                                                                title='Envoyer par email au client'
                                                                className='ml-2 btn btn-rounded btn-primary p-1'>
                                                                <i className='mdi mdi-file-send'></i>
                                                            </button>
                                                            <button
                                                                title='Supprimer'
                                                                className='ml-2 btn btn-rounded btn-danger p-1'><i className='mdi mdi-delete'></i></button>
                                                        </td>
                                                    </tr>
                                                ))
                                            )
                                        :
                                        <tr>
                                            <td colSpan={8} className='text-center'>Aucune facture</td>
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
