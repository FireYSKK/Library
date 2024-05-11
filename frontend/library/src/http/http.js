import axios from "axios";

const API_URL = "http://localhost:3020/"

export const $api = axios.create({
    baseURL: API_URL,
    withCredentials: true
})

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('access_token')}`

    return config
})
