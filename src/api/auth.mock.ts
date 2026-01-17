import { mockDelay } from '../services/mockDelay.service';
import { AuthResponse, User } from '../types/auth.types';

const MOCK_USER: User = {
    id: '1',
    username: 'demo_user',
    name: 'Demo User',
};

export const authApi = {
    login: async (username: string, password: string): Promise<AuthResponse> => {
        await mockDelay(1500);
        // Determine strictness later, for now accept anything non-empty
        if (username && password) {
            return {
                user: MOCK_USER,
                token: 'mock-jwt-token-123',
            };
        }
        throw new Error('Invalid credentials');
    },

    logout: async (): Promise<void> => {
        await mockDelay(500);
    },

    checkSession: async (): Promise<User> => {
        await mockDelay(1000);
        return MOCK_USER;
    }
};
