import axios from "axios";
import axiosIns, { baseURL } from "../../constants/helper";
import { Alert, ToastAndroid } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";


export const Init = () => {
    return async (dispatch: any) => {
        try {
            let access = await AsyncStorage.getItem('access');
            dispatch({
                type: 'SET_ACCESS',
                payload: access,
            });
        } catch (error) {
            dispatch({
                type: 'SET_ACCESS',
                payload: null,
            });
        }
    };
};


export const LoginAction = (data: any, setLoading: any, navigate: any) => {
    setLoading(true);
    return async (dispatch: any) => {
        try {
            await axios.post(baseURL + '/token/', data)
                .then(async (res) => {
                    ToastAndroid.show("Login successful", ToastAndroid.LONG);

                    await AsyncStorage.setItem('access', res?.data?.access);

                    dispatch({
                        type: 'SET_ACCESS',
                        payload: res?.data?.access,
                    });
                    setLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                    ToastAndroid.show(err?.response?.data?.message || "Something went wrong!", ToastAndroid.LONG);
                    setLoading(false);
                });
        } catch (error) {
            console.log(error);
            ToastAndroid.show((error as any)?.response?.data?.message || "An error occurred during login.", ToastAndroid.LONG);
            setLoading(false);
        }
    };
};

export const RegisterAction = (data: any, setLoading: any, navigate: any) => {
    setLoading(true);
    return async (dispatch: any) => {
        try {
            await axios.post(baseURL + '/register/', data)
                .then(async (res) => {
                    ToastAndroid.show("User registered successfully", ToastAndroid.LONG);
                    setLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                    ToastAndroid.show(err?.response?.data?.message || "Something went wrong!", ToastAndroid.LONG);
                    setLoading(false);
                });
        } catch (error) {
            console.log(error);
            ToastAndroid.show((error as any)?.response?.data?.message || "An error occurred during login.", ToastAndroid.LONG);
            setLoading(false);
        }
    };
};




export const LogoutAction = (navigate: any) => {
    return async (dispatch: any) => {
        await AsyncStorage.clear();
        dispatch({
            type: 'SET_ACCESS',
            payload: null,
        });
        Alert.alert("Success", "Logged out successfully");
        navigate('/');
    };
}