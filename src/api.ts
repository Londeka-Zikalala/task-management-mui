import axios from 'axios';

const config = {
    baseURL: import.meta.env.VITE_API_BASE_URL, 
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
}
const api = axios.create(config);

console.log(config)

export default api;
