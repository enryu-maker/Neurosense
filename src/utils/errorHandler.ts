import { Alert } from 'react-native';

export const handleError = (error: unknown, title = 'Error') => {
    console.error(error);
    Alert.alert(title, 'An unexpected error occurred.');
};
