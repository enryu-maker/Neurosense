import React, { createContext, useState, ReactNode } from 'react';
import { User } from '../types/auth.types';
import { authApi } from '../api/auth.mock';

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    isInitialized: boolean;
    login: (u: string, p: string) => Promise<void>;
    logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);

    React.useEffect(() => {
        const initAuth = async () => {
            // Simulate checking for stored session
            await new Promise(resolve => setTimeout(() => resolve(true), 2000));
            setIsInitialized(true);
        };
        initAuth();
    }, []);

    const login = async (u: string, p: string) => {
        setIsLoading(true);
        try {
            const response = await authApi.login(u, p);
            setUser(response.user);
        } catch (e) {
            console.error(e);
            throw e;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        setIsLoading(true);
        try {
            await authApi.logout();
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
                isLoading,
                isInitialized,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
