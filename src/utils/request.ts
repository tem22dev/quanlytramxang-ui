import axios from 'axios';

const request = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL_API,
    withCredentials: true,
});

const accessToken = localStorage.getItem('access_token');
request.defaults.headers.common = { Authorization: `Bearer ${accessToken}` };

request.interceptors.request.use(
    function (config) {
        return config;
    },
    function (error) {
        return Promise.reject(error);
    },
);

request.interceptors.response.use(
    function (response) {
        return response && response.data ? response.data : response;
    },
    function (error) {
        if (error.config && error.response && error.response && +error.response.status === 500) {
            return {
                status: error.response.status,
                message: error.message,
            };
        }

        return error?.response?.data ?? Promise.reject(error);
    },
);

export default request;
