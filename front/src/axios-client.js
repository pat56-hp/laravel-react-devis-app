import axios from 'axios'
import { toast } from 'react-toastify'

const axiosClient = axios.create({
    baseURL: `http://127.0.0.1:8000/api/`
})

//Request interceptor
axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('ACCESS_TOKEN')
    config.headers.Authorization = 'Bearer ' + token
    return config
})

//Response interceptor
axiosClient.interceptors.response.use((response) => {
    return response
}, (error) => {
    const {response} = error
    
    console.log(response.status)
    if (response.status === 401) {
        localStorage.removeItem('ACCESS_TOKEN')
    }
    if (response.status === 404) {
        toast.error('Oups, impossible d\'accéder au server')
    }

    throw error
})

export default axiosClient