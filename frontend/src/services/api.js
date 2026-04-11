
import axios from 'axios'

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080',
})

export const calculateToll = (data) => API.post('/api/toll/calculate', data)
export const getTrips = (userId) => API.get(`/api/trips/${userId}`)
export const getSavedRoutes = (userId) => API.get(`/api/routes/${userId}`)
export const saveRoute = (data) => API.post('/api/routes/save', data)
export const deleteRoute = (id) => API.delete(`/api/routes/${id}`)
