import { Navigate, createBrowserRouter } from "react-router-dom";
import Dashboard from "./views/Dashboard";
import Login from "./views/Login";
import Register from "./views/Register";
import NotFound from "./views/NotFound";
import GuestLayout from "./components/GuestLayout";
import DefaultLayout from "./components/DefaultLayout";
import User from "./views/users/User";
import Client from "./views/clients/Client";
import Project from "./views/projects/Project";
import Categories from "./views/categories/Categories";
import ProjectForm from "./views/projects/ProjectForm";
import Facture from "./views/Factures/Facture";
import FactureForm from "./views/Factures/FactureForm";
import FacturePdf from "./views/Factures/FacturePdf";
import Layout from "./views/profile/Layout";

const router = createBrowserRouter([
    {
        element: <GuestLayout />,
        children: [
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/register',
                element: <Register />
            },
        ]
    },
    {
        element: <DefaultLayout />,
        children: [
            {
                path: '/',
                element: <Navigate to="/dashboard" />
            },
            {
                path: '/dashboard',
                element: <Dashboard />
            },
            {
                path: '/profile',
                element: <Layout />
            },
            {
                path: '/users',
                element: <User />
            },
            {
                path: '/clients',
                element: <Client />
            },
            {
                path: '/projects',
                element: <Project />,
            },
            {
                path: '/projects/create',
                element: <ProjectForm indice={'new'} />,
            },
            {
                path: '/projects/:id',
                element: <ProjectForm indice={'edit'} />,
            },
            {
                path: '/projects/categories',
                element: <Categories />
            },
            {
                path: '/factures',
                element: <Facture />
            },
            {
                path: '/factures/create',
                element: <FactureForm indice={'add'} />
            },
            {
                path: '/factures/:id',
                element: <FactureForm indice={'edit'} />
            },
            {
                path: '/factures/:id/pdf',
                element: <FacturePdf />
            },
            
        ]
    },
    
    {
        path: '*',
        element: <NotFound />
    }
])

export default router; 