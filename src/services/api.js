import axios from 'axios';

const api = axios.create({
    baseURL : "https://localhost:7046", 
})

export default api;