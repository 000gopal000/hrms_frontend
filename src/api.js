import axios from 'axios';

const api = axios.create({
     baseURL: 'https://ethara-ai-backend-production.up.railway.app',
});

export default api;
