import { useDispatch, useSelector } from 'react-redux';
import { LoginAction, RegisterAction, LogoutAction } from '../store/actions/authAction';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

export const useAuth = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(false);
    // @ts-ignore
    const accessToken = useSelector((state) => state.reducer.access);

    const login = async (username: string, password: string) => {
        setIsLoading(true);
        // Assuming the API expects an object with email/username and password
        // LoginScreen passes (username, password)
        // loginAction expects (data, setLoading, navigate)
        // passing username as email, adjust if specific key needed
        // @ts-ignore
        dispatch(LoginAction({ email: username, password }, setIsLoading, navigation));
    };

    const register = async (data: any) => {
        setIsLoading(true);
        // @ts-ignore
        dispatch(RegisterAction(data, setIsLoading, navigation));
    };

    const logout = () => {
        // @ts-ignore
        dispatch(LogoutAction(navigation));
    };

    return {
        login,
        register,
        logout,
        isLoading,
        token: accessToken
    };
};
