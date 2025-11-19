import axios from 'axios';

const API='http://192.168.1.4:3000';

const api = axios.create({
    baseURL:API,
    timeout:60000
});

api.interceptors.request.use(
    (config)=>{
        console.log(`Making ${config.method?.toUpperCase()} request to: ${config.url}`);
        return config;
    },
    (error) => {
        console.error('Request error:', error);
        return Promise.reject(error);
    }
)

api.interceptors.response.use(
  (response) => {
    console.log(` Response received: ${response.status}`);
    return response;
  },
  (error) => {
        console.error(' esponse error:', {
        message: error.message,
        url: error.config?.url,
        status: error.response?.status,
    });
    return Promise.reject(error);
  }
);

export const backendApi = {

    testConnection:()=> api.get('/'),

    createInvitation: ()=> api.post('/connection/create-invitation'),

    getConnections: ()=> api.get('/connection/connections?agent=acme'),

};

export default api;