import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
import { Alert } from 'react-native';

// export const baseURL = 'https://api.togaapp.in';
export const baseURL = "http://192.168.1.43:8000/api/v1";



let headers = {}
const axiosIns = axios.create({
    baseURL: baseURL,
    headers
})

axiosIns.interceptors.request.use(
    async (config) => {
        // 1. Check for custom base URL, otherwise use default
        const savedBaseURL = await AsyncStorage.getItem('custom_base_url');
        config.baseURL = savedBaseURL || baseURL;

        // 2. Add Token
        const token = await AsyncStorage.getItem('access');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axiosIns.interceptors.response.use(
    (response) =>
        new Promise((resolve, reject) => {
            resolve(response)
        }),
    (error) => {
        if (!error.response) {
            return new Promise((resolve, reject) => {
                reject(error)
            })
        }
        if (error.response.status === 401) {
            Alert.alert('Access denied! Permission slip required.')
        } else {
            return new Promise((resolve, reject) => {
                reject(error)
            })
        }
    }
)

export default axiosIns
