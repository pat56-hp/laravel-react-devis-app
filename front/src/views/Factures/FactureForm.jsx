import React, { useEffect, useState } from 'react'
import Breadcumb from '../../components/Breadcumb'
import { Link, useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select'
import { tailChase } from 'ldrs'
import ElementFacture from './ElementFacture';
import axiosClient from '../../axios-client';
import { toast } from 'react-toastify';

export default function FactureForm({indice}) {

    tailChase.register()
    const {id} = useParams()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState(null)
    const [sousTotal, setSousTotal] = useState(0)
    const [total, setTotal] = useState(0)
    const [remise, setRemise] = useState(0)
    const [discount, setDiscount] = useState(0)
    const [projectOptions, setProjectOptions] = useState([])
    const [configRemise, setConfigRemise] = useState('%')
    const [isLoad, setIsLoad] = useState(false)
    const [facture, setFacture] = useState({
        date: '',
        project_id:'',
        status: 0
    })
    
    const elementDefault = {
        libelle: '',
        qty: 1,
        prix: 0,
        description:'',
        montant: 0
    }

    const [elements, setElements] = useState([elementDefault])

    const addLine = () => {
        setElements(prevElements => [...prevElements, elementDefault]);
    }

    const handleChangeRemise = (e) => {
        setDiscount(() => {
            let newRemise = 0
            let discount = newRemise = e.target.value === '' ? 0 : e.target.value

            if (configRemise === '%') {
                newRemise = (discount / 100) * sousTotal
                console.log(newRemise)
            }else if(configRemise !== 'amount' && configRemise !== '%'){
                return
            }

            const total = parseFloat(sousTotal) - parseFloat(newRemise)

            setRemise(newRemise > 0 ? newRemise : 0)
            setTotal(total > 0 ? total : 0)

            return discount
        })
        
    }

    const handleChangeSelectRemise = (e) => {
        setConfigRemise(() => {
            const newSelectRemise = e.target.value
            let newRemise = discount
            

            if (newSelectRemise === '%') {
                newRemise = (discount / 100) * sousTotal
            }else if(newSelectRemise !== 'amount' && newSelectRemise !== '%'){
                return
            }

            const total = parseFloat(sousTotal) - parseFloat(newRemise)
            
            setRemise(newRemise > 0 ? newRemise : 0)
            setTotal(total > 0 ? total : 0)

            return newSelectRemise
        })
    }

    //Mise a niveau des valeurs
    const defaultValue = () => {
        setElements([elementDefault])
        setFacture({
            date: '',
            project_id:'',
            status: 0
        })
        setRemise(0)
        setConfigRemise('%')
        setSousTotal(0)
        setDiscount(0)
        setTotal(0)
        setLoading(false)
        setErrors(null)
    }

    const handleSumbit = (e) => {
        e.preventDefault();
        setLoading(true)
        setErrors(null)
        setTimeout(() => {
            if (facture.date.length === 0) {
                setErrors({
                    error: 'La date de la facture est obligatoire'
                })
                setLoading(false)
                return
            }
    
            if (facture.project_id.length === 0) {
                setErrors({
                    error: 'Le projet est obligatoire'
                })
                setLoading(false)
                return
            }
    
            if (elements.length === 0) {
                setErrors({
                    error: 'Veuillez ajouter au moins un élément à la facture'
                })
                setLoading(false)
                return
            }

            elements.forEach((element, index) => {
                if (element.libelle.length === 0) {
                    setErrors({
                        error: 'Veuillez renseigner le libéllé de l\'élément '+ (index+1)
                    })
                    setLoading(false)
                    return
                }
                if (element.qty.length === 0) {
                    setErrors({
                        error: 'Veuillez renseigner la quantité de l\'élément '+ (index++)
                    })
                    setLoading(false)
                    return
                }
                if (element.prix.length === 0) {
                    setErrors({
                        error: 'Veuillez renseigner le prix de l\'élément '+ (index++)
                    })
                    setLoading(false)
                    return
                }
            })

            if (errors === null) {
                const payload = {
                    facture: facture,
                    elements: elements,
                    remise: remise,
                    sousTotal: sousTotal,
                    total: total,
                    configRemise: configRemise,
                    discount: discount,
                }

                if (indice === 'add') {
                    createFacture(payload)
                }else{
                    updateFatcure(payload)
                }
            }
            
        }, 2000)
    }

    //Creation de la facture
    const createFacture = (payload) => {
        axiosClient.post('/factures/store', payload)
            .then(() => {
                defaultValue()
                toast.success('Facture enregistrée avec succès')
                setLoading(false)
                navigate("/factures")
            })
            .catch(err => {
                const response = err.response
                if (response && response.status === 422) {
                    setErrors(response.data.errors)
                }
                if (response && response.status === 419) {
                    console.log(response.data)
                    toast.error('Oups, une erreur s\'est produite. L\'enregistrement n\'a pu être éffectué')
                }
                if (response && response.status === 401) {
                    navigate('/login')
                }
                setLoading(false)
            })
    }

    //Modification de la facture
    const updateFatcure = (payload) => {

        axiosClient.put(`factures/update/${id}`, payload)
            .then(() => {
                defaultValue()
                toast.success('Facture modifiée avec succès')
                setLoading(false)
                navigate("/factures")
            })
            .catch(err => {
                const response = err.response
                if (response && response.status === 422) {
                    setErrors({
                        error: response.data.errors
                    })
                }
                if (response && response.status === 419) {
                    console.log(response.data)
                    toast.error('Oups, une erreur s\'est produite. L\'enregistrement n\'a pu être éffectué')
                }
                if (response && response.status === 401) {
                    navigate('/login')
                }
                setLoading(false)
            })
    }

    const getProject = () => {
        setIsLoad(true)
        axiosClient.get('projects')
            .then(({data}) => {
                const projects = []
                data.data.forEach(project => {
                    if (project.status !== 2) {
                        projects.push({
                            value: project.id,
                            label: project.title
                        })
                    }
                })
                setProjectOptions(projects)
                setIsLoad(false)
            })
            .catch(err => {
                const resp = err.response
                if (resp && resp.status === 401) {
                    navigate('/login')
                }
                setIsLoad(false)
            })
    }

    const getElementById = () => {
        if (id) {
            setIsLoad(true)
            axiosClient.get(`factures/show/${id}`)
                .then(({data}) => {
                    const facture = data.facture
                    const elements = data.facture.elements
                    const newElements = elements.map(element => ({
                        libelle: element.libelle,
                        qty: element.qty,
                        prix: element.prix,
                        description: element.description,
                        montant: element.montant
                    }))
                    
                    setFacture({
                        date: facture.date,
                        project_id: facture.project_id,
                        status: facture.status
                    })

                    setSousTotal(facture.sousTotal)
                    setDiscount(facture.discount)
                    setRemise(facture.remise)
                    setTotal(facture.total)
                    setElements(newElements)
                    setIsLoad(false)
                })
                .catch(err => {
                    const resp = err.response
                    if (resp && resp.status === 401) {
                        navigate('/login')
                    }
                    setIsLoad(false)
                })
        }
    }

    // eslint-disable-next-line
    useEffect(() => {
        getProject()
        getElementById()
    }, [])


  return (
    <div className='container'>
        <Breadcumb title='Factures' first='Tableau de bord' active='Ajouter une facture'/>
        <div className='row'>
            <div className='col-md-12'>
                <div className="card">
                    <div className="card-body">
                        <div className="card-title">
                            <div className='d-flex justify-content-between'>
                                <h4>Ajouter une facture</h4>
                                <Link to='/factures' className='btn btn-primary'>
                                    <i className='mdi mdi-plus'></i> Liste des factures
                                </Link>
                            </div>
                        </div>
                        {
                            isLoad ?
                            <div className='text-center mt-5'>
                                <img src='/speaner.svg' />
                            </div>
                            :
                            <form className='mt-5' onSubmit={handleSumbit}>
                                {
                                    errors && 
                                    <div className='alert alert-danger'>
                                        {Object.keys(errors).map((key, index) =>  (
                                            <span key={index}>{errors[key]} <br/></span> 
                                        ))}
                                    </div>
                                }
                                <div className='row'>
                                    <div className='col-md-6'>
                                        <label htmlFor='date'>Date de facture <span className='text-danger'>*</span></label>
                                        <input 
                                            onChange={(e) => setFacture({...facture, date:e.target.value})}
                                            value={facture.date}
                                            type='date'
                                            className='form-control'/>
                                    </div>
                                    <div className='col-md-6'>
                                        <label htmlFor='date'>Projet <span className='text-danger'>*</span></label>
                                        <Select 
                                            value={projectOptions.filter(project => project.value === facture.project_id)}
                                            options={projectOptions}
                                            onChange={(project) => setFacture({...facture, project_id: project.value})}
                                        />
                                    </div>
                                    <div className='col-md-12 mt-5'>
                                        <h4>Eléments de facture</h4>
                                        <hr/>
                                    </div>
                                    <div className='col-md-12'>
                                        <div className='element-items'>
                                            {
                                                elements.map((element, index) => (
                                                    <ElementFacture 
                                                        key={index}
                                                        index={index}
                                                        setElements={setElements}
                                                        element={element}
                                                        setSousTotal={setSousTotal}
                                                        setTotal={setTotal}
                                                        remise={remise}/>
                                                ))
                                            }
                                        
                                        </div>
                                        <span 
                                            onClick={addLine}
                                            className='add-item text-success' 
                                            style={{cursor: 'pointer'}}>
                                                <i className='mdi mdi-plus-circle'></i> Ajouter une ligne
                                        </span>
                                    </div>
                                    <div className='col-md-12 mt-5'>
                                        <hr className='m-0'/>
                                    </div>
                                    <div className='col-md-12'>
                                        <div className='table-responsive d-flex justify-content-end align-items-center'>
                                            <table className="table ms-auto invoice-table-bottom w-50 text-end table-bordered"> 
                                                <tbody>
                                                    <tr className="border-top-0">
                                                        <td colSpan="3" className="border-top-0">Sous-total</td>
                                                        <td className="border-top-0">{sousTotal}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Remise</td>
                                                        <td className="w-30"> 
                                                            <input 
                                                                value={discount}
                                                                onChange={handleChangeRemise}
                                                                type="number" 
                                                                className="form-control text-end" 
                                                                min="0" /> 
                                                        </td>
                                                        <td className="w-15"> 
                                                            <div className="form-group mb-0 text-start"> 
                                                                <div className="choices">
                                                                    <div className="choices__inner">
                                                                        <select className="form-control choices__input" value={configRemise} onChange={handleChangeSelectRemise}>
                                                                            <option value="%">%</option>
                                                                            <option value="amount">Amount</option>
                                                                        </select>
                                                                    </div>
                                                                </div> 
                                                            </div>
                                                        </td>
                                                        <td>{remise}</td>
                                                    </tr>
                                                    <tr className="bg-primary-transparent text-primary-dark fw-bold fs-15">
                                                        <td colSpan="3">Total</td>
                                                        <td>{total}</td>
                                                    </tr> 
                                                    <tr>
                                                        <td>Statut</td>
                                                        <td className="w-100" colSpan="3"> 
                                                            <select 
                                                                value={facture.status}
                                                                className='form-control'
                                                                onChange={e => setFacture({...facture, status: e.target.value})}
                                                                >
                                                                <option value="0">Impayée</option>
                                                                <option value="1">Payée</option>
                                                            </select>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div className="col-md-12 m-b-15 m-t-15">
                                        <button 
                                            type="submit" 
                                            className="btn btn-primary">
                                                <i className='mdi mdi-content-save'></i> 
                                                    Enregistrer
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
                        }
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
