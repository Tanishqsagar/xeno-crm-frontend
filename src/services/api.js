import axios from 'axios';

console.log("VITE_API_BASE_URL:", import.meta.env.VITE_API_BASE_URL);
// BASE_URL=

const api = axios.create({
  baseURL: 'https://xeno-crm-backend-77xi.onrender.com',
  // baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  withCredentials: true,
});

export default api;

