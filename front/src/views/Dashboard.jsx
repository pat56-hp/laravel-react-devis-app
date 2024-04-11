import React from 'react'
import Breadcumb from '../components/Breadcumb'
import { useStateContext } from '../contexts/ContextProvider'


export default function Dashboard() {
    const {user} = useStateContext()

  return (
    <div className="container">
        <Breadcumb title={`Bienvenue, ${user.name}`} first={null} active='Tableau de bord' />
        <div className="row">
            <div className="col-lg-4">
                <div className="card">
                    <div className="card-body">
                        <h4>Download <span className="pull-right"><i className="ion-android-download f-s-30 text-primary"></i></span></h4>
                        <h6 className="m-t-20 f-s-14">50% Complete</h6>
                        <div className="progress m-t-0 h-7px">
                            <div role="progressbar" className="progress-bar bg-primary wow animated progress-animated w-50pc h-7px"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-lg-4">
                <div className="card">
                    <div className="card-body">
                        <h4>Upload <span className="pull-right"><i className="ion-android-upload f-s-30 text-success"></i></span></h4>
                        <h6 className="m-t-20 f-s-14">90% Complete</h6>
                        <div className="progress m-t-0 h-7px">
                            <div role="progressbar" className="progress-bar bg-success wow animated progress-animated w-90pc h-7px"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-lg-4">
                <div className="card">
                    <div className="card-body">
                        <h4>Ticket <span className="pull-right"><i className="ion-android-list f-s-30 text-danger"></i></span></h4>
                        <h6 className="m-t-20 f-s-14">65% Ticket Checked</h6>
                        <div className="progress m-t-0 h-7px">
                            <div role="progressbar" className="progress-bar bg-danger wow animated progress-animated w-65pc h-7px"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    
        <div className="row">
            <div className="col-lg-12 col-xl-12">
                <div className="card">
                    <div className="card-body">
                        <div className="active-member">
                            <div className="table-responsive">
                                <table className="table table-xs">
                                    <thead>
                                        <tr>
                                            <th>Top Active Members</th>
                                            <th>Views</th>
                                            <th>Country</th>
                                            <th>Status</th>
                                            <th>Comments</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <img src="../../assets/images/avatar/1.jpg" className="w-40px rounded-circle m-r-10" alt=""/>Arden Karn</td>
                                            <td><span>125</span>
                                            </td>
                                            <td>United States</td>
                                            <td><i className="fa fa-circle-o text-success f-s-12 m-r-10"></i> Active</td>
                                            <td><span>84</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <img src="../../assets/images/avatar/2.jpg" className="w-40px rounded-circle m-r-10" alt=""/>Arden Karn</td>
                                            <td><span>547</span>
                                            </td>
                                            <td>Canada</td>
                                            <td><i className="fa fa-circle-o text-success f-s-12 m-r-10"></i> Active</td>
                                            <td><span>36</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <img src="../../assets/images/avatar/3.jpg" className="w-40px rounded-circle m-r-10" alt=""/>Arden Karn</td>
                                            <td><span>557</span>
                                            </td>
                                            <td>Germany</td>
                                            <td><i className="fa fa-circle-o text-danger f-s-12 m-r-10"></i> Inactive</td>
                                            <td><span>55</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <img src="../../assets/images/avatar/4.jpg" className="w-40px rounded-circle m-r-10" alt=""/>Arden Karn</td>
                                            <td><span>753</span>
                                            </td>
                                            <td>England</td>
                                            <td><i className="fa fa-circle-o text-success f-s-12 m-r-10"></i> Active</td>
                                            <td><span>45</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <img src="../../assets/images/avatar/5.jpg" className="w-40px rounded-circle m-r-10" alt=""/>Arden Karn</td>
                                            <td><span>453</span>
                                            </td>
                                            <td>China</td>
                                            <td><i className="fa fa-circle-o text-danger f-s-12 m-r-10"></i> Inactive</td>
                                            <td><span>63</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <img src="../../assets/images/avatar/6.jpg" className="w-40px rounded-circle m-r-10" alt=""/>Arden Karn</td>
                                            <td><span>658</span>
                                            </td>
                                            <td>Japan</td>
                                            <td><i className="fa fa-circle-o text-success f-s-12 m-r-10"></i> Active</td>
                                            <td><span>38</span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
