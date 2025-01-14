import axios from "axios";

const backend = axios.create({
    baseURL: 'https://json-api.uz/api/project/blog-api/'
})

export default backend;

backend.interceptors.request.use(config => {
    // let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidHlwZSI6ImFkbWluIiwiaWF0IjoxNzM2NzAwNzkxLCJleHAiOjE3MzY3MDQzOTF9.jN_1_Z4b5XljEAHZAIhjsOL562pmt65iEUIfeGmUlqI'
    const token = localStorage.getItem('user') ? localStorage.getItem('user') : ''
    if (token) {
        config.headers.Authorization = `Bearer ${token?.access_token}`;
    }
    return config;
});

backend.interceptors.response.use(
    response => response,
    error => {
        const status = error.response ? error.response.status : null;
        const errorMessage = error.response?.data?.message || error.message;

        if (status === 401) {
            console.error("Unauthorized: Token is invalid or expired.");
        } else if (status === 403) {
            console.error("Forbidden: You do not have permission to access this resource.");
        } else if (status === 404) {
            console.error("Not Found: The requested resource was not found.");
        } else {
            console.error(`Error ${status}: ${errorMessage}`);
        }

        return Promise.reject(error);
    }
);