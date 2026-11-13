import axios from 'axios';

const api = axios.create({
  baseURL: 'https://blood-donation-backend-kzac.onrender.com/api'
});

export default api;