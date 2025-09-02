import axios from "axios";

const baseURL = 'http://localhost:8000'

const instance = axios.create({
    baseURL: baseURL,
    headers: {
        'content-type': 'application/json',
    },
});

instance.interceptors.request.use(
    (config) => {
        const accessToken = sessionStorage.getItem('accessToken');
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshToken = sessionStorage.getItem('refreshToken');
            if (refreshToken) {
                try {
                    const response = await axios.post(
                        `${baseURL}/auth/refresh/`,
                        {refresh: refreshToken});
                    const newAccessToken = response.data.access
                    sessionStorage.setItem('accessToken', newAccessToken);
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                    return axios(originalRequest)
                } catch (error) {
                    console.error('Refresh error:', error.response ? error.response.data : error.message)
                    sessionStorage.removeItem('refreshToken');
                    sessionStorage.removeItem('accessToken');
                }
            }
        }
        return Promise.reject(error);
    }
);

export default instance;

