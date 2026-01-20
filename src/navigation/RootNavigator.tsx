import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthNavigator } from './AuthNavigator';
import { AppNavigator } from './AppNavigator';
import { RootStackParamList } from './navigation.types';
import { useAuth } from '../hooks/useAuth';
import { SplashScreen } from '../screens/Splash/SplashScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
    const { isAuthenticated, isInitialized } = useAuth();

    if (!isInitialized) {
        return <SplashScreen />;
    }

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {isAuthenticated ? (
                    <Stack.Screen name="App" component={AppNavigator} />
                ) : (
                    <Stack.Screen name="Auth" component={AuthNavigator} />
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};
