import React from 'react'
import Breadcumb from '../../components/Breadcumb'
import Profile from './Profile'
import Password from './Password'

export default function Layout() {

  return (
    <div className="container">
         <Breadcumb title='Modifer mon profil' first='Tableau de bord' active='Mon profil'/>
         <div className="row">
            <div className="col-12">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Mon profil</h4>
                        <h6 className="card-subtitle">Cette section est utilisée pour la modification de votre profil</h6>
                        
                        <div className="custom-tab-1 mt-5">
                            <ul className="nav nav-tabs">
                                <li className="nav-item"><a className="nav-link active show" data-toggle="tab" href="#profile">Modifier mes informations</a>
                                </li>
                                <li className="nav-item"><a className="nav-link" data-toggle="tab" href="#password">Modifier mon mot de passe</a>
                                </li>
                            </ul>
                            <div className="tab-content">
                                <div className="tab-pane fade active show" id="profile" role="tabpanel">
                                    <div className="p-t-15">
                                        <Profile />
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="password">
                                    <div className="p-t-15">
                                        <Password />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
