import React from 'react'
import { useStateContext } from '../contexts/ContextProvider'
import { Link } from 'react-router-dom'

export default function Breadcumb(props) {

  return (
    <div className="row page-titles">
        <div className="col p-0">
            <h4>{props.title}<span></span></h4>
        </div>
        <div className="col p-0">
            <ol className="breadcrumb">
                {
                    props.first !== null &&
                    <><li className="breadcrumb-item"><Link to="/">{props.first}</Link></li>
                    <li className="breadcrumb-item active">{props.active}</li></>
                }
                {
                    props.first === null && 
                    <li className="breadcrumb-item">Tableau de bord</li>     
                }
                
            </ol>
        </div>
    </div>
  )
}
