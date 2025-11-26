import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to include the auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const automationApi = {
    getAutomations: () => api.get('/automation'),
    getAutomation: (id) => api.get(`/automation/${id}`),
    runAutomation: (id) => api.post(`/automation/run/${id}`),
    getHistory: () => api.get('/automation/history'),
    getStats: () => api.get('/automation/stats'),
};

export const authApi = {
    login: (username, password) => api.post('/auth/login', { username, password }),
    register: (username, password) => api.post('/auth/register', { username, password }),
};

export default api;
