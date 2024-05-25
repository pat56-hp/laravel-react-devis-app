import React, { useEffect, useState } from 'react'
import Breadcumb from '../../components/Breadcumb'
import { Link, useNavigate } from 'react-router-dom'
import axiosClient from '../../axios-client'
import { toast } from 'react-toastify'
import number_format from "../../helpers/numberFormat";

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

    const deleteFacture = (id) => {
        if (!window.confirm('Êtes-vous sûre de vouloir supprimer cette facture ?')) {
            return 
        }
        setLoading(true)
        axiosClient.delete('/factures/delete/' + id)
            .then(() => {
                setLoading(false)
                getFacture()
                toast.success('Facture supprimée avec succès')
            })
            .catch(err => {
                const resp = err.response
                if(resp && resp.status === 401){
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
                                                        <td>{number_format(facture.total, 0, ' ', ' ')} FCFA</td>
                                                        <td>
                                                            {facture.status === 0 && <span className="badge badge-warning">Impayée</span>}
                                                            {facture.status === 1 && <span className="badge badge-primary">Payée</span>}
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
                                                                onClick={() => deleteFacture(facture.id)}
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
