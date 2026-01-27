import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
import { Alert } from 'react-native';

// export const baseURL = 'https://api.togaapp.in';
export const baseURL = "http://100.120.13.18:8000/api/v1";



let headers = {}
const axiosIns = axios.create({
    baseURL: baseURL,
    headers
})

axiosIns.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('access')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error.msg)
    }
)

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
