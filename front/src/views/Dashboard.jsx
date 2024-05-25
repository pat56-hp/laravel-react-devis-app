import React, { useEffect, useState } from 'react'
import Breadcumb from '../components/Breadcumb'
import { useStateContext } from '../contexts/ContextProvider'
import axiosClient from '../axios-client'
import { useNavigate } from 'react-router-dom'


export default function Dashboard() {
    const {user} = useStateContext()
    const navigate = useNavigate()
    const [totalProjet, setTotalProjet] = useState(0)
    const [totalProjetEnCours, setTotalProjetEnCours] = useState(0)
    const [totalProjetTermine, setTotalProjetTermine] = useState(0)
    const [loading, setLoading] = useState(false)
    const [clients, setClients] = useState([])

    const getData = () => {
        setLoading(true)
        axiosClient.get('/getdatas')
            .then(({data}) => {
                console.log(data)
                setTotalProjet(data.totalProject)
                setTotalProjetEnCours(data.totalProjectEnCours)
                setTotalProjetTermine(data.totalProjectTermine)
                setClients(data.clients)
                setLoading(false)
            })
            .catch(err => {
                const resp = err.response
                if(resp && resp.status === 401){
                    navigate('/login')
                }
                setLoading(false)
            })
    }

    useEffect(() => {
        getData()
    }, [])

  return (
    <div className="container">
        <Breadcumb title={`Bienvenue, ${user.name}`} first={null} active='Tableau de bord' />
        {
            loading ? 
            <div className='text-center'>
                <img src='/speaner.svg' />
            </div>
            :
            (
                <>
                    <div className="row">
                        <div className="col-lg-4">
                        <div className="card">
                            <div className="card-body">
                                <h4>Projets <span className="pull-right"><i className="ion-android-list f-s-30 text-danger"></i></span></h4>
                                <h6 className="m-t-20 f-s-18">{totalProjet}</h6>
                            </div>
                        </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="card">
                                <div className="card-body">
                                    <h4>Projet(s) en cours <span className="pull-right"><i className="ion-android-download f-s-30 text-primary"></i></span></h4>
                                    <h6 className="m-t-20 f-s-18">{totalProjetEnCours}</h6>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="card">
                                <div className="card-body">
                                    <h4>Projet(s) terminé(s) <span className="pull-right"><i className="ion-android-upload f-s-30 text-success"></i></span></h4>
                                    <h6 className="m-t-20 f-s-18">{totalProjetTermine}</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                
                    <div className="row">
                        <div className="col-lg-12 col-xl-12">
                            <div className="card">
                                <div className="card-body">
                                    <h3>Liste des 10 derniers clients</h3>
                                    <div className="active-member">
                                        <div className="table-responsive">
                                            <table className="table table-xs">
                                                <thead>
                                                    <tr>
                                                        <th>Nom & prénom(s)</th>
                                                        <th>Email</th>
                                                        <th>Contact</th>
                                                        <th className='text-center'>Total projet</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        clients.map((client, index) => (
                                                            <tr key={index}>
                                                                <td>{client.name}</td>
                                                                <td>
                                                                    {client.email !== null ? <><span className='mdi mdi-email'></span> {client.email} </> : 'Aucun'}
                                                                </td>
                                                                <td><span className='mdi mdi-phone'></span> {client.phone} </td>
                                                                <td className='text-center'><span className="badge badge-warning">{client.total_project}</span></td>
                                                            </tr>
                                                        ))
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )
        }
        
    </div>
  )
}
