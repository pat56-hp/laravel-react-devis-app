import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useStateContext } from '../contexts/ContextProvider';
import axiosClient from '../axios-client';

export default function Sidebar() {

    const {setToken, setUser, user} = useStateContext()
    const navigate = useNavigate()

    const handleLogout = (e) => {
        e.preventDefault();

        if (!window.confirm('Êtes-vous sûre de vouloir vous déconnecter ?')) {
            return
        }

        axiosClient.post('auth/logout')
            .then(() => {
                setToken(null)
                setUser(null)
                navigate('/login')
            })
            .catch(err => {
                const response = err.response
                console.log(response);
            })
    }

  return (
    <div className="nk-sidebar">
        <div className="nk-nav-scroll">
            <ul className="metismenu" id="menu">
                <li className="nav-label">Main</li>
                <li>
                    <NavLink to="/dashboard" className={({isActive}) => (isActive ? 'active' : '' )}><i className=" mdi mdi-view-dashboard"></i> <span className="nav-text">Tableau de bord</span>
                    </NavLink>
                </li>
                {
                    user.role == 1 && 
                    <li>
                        <NavLink to="/users" className={(isActive) => (isActive ? 'active' : '')}>
                            <i className="mdi mdi-account"></i> <span className="nav-text">Utilisateurs</span>
                        </NavLink>
                    </li>
                }
                <li>
                    <NavLink to="/clients" className={(isActive) => (isActive ? 'active' : '')}>
                        <i className="mdi mdi-account-multiple-plus"></i> <span className="nav-text">Clients</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/projects" className={(isActive) => (isActive ? 'active' : '')}>
                        <i className="mdi mdi-folder"></i> <span className="nav-text">Projets</span>
                    </NavLink>
                </li>
                {
                    user.role == 1 && 
                    <li>
                        <NavLink to="/projects/categories" className={(isActive) => (isActive ? 'active' : '')}>
                            <i className="mdi mdi-folder-open"></i> <span className="nav-text">Categories</span>
                        </NavLink>
                    </li>
                }
                <li>
                    <NavLink to="/factures" className={(isActive) => (isActive ? 'active' : '')}>
                        <i className="mdi mdi-credit-card"></i> <span className="nav-text">Factures</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink onClick={handleLogout}  className={(isActive) => (isActive ? 'active' : '')}>
                        <i className="mdi mdi-logout"></i> <span className="nav-text">Déconnexion</span>
                    </NavLink>
                </li>
            </ul>
        </div>
    </div>
  )
}
