export interface User {
    id: string;
    username: string;
    name: string;
}

export interface AuthResponse {
    user: User;
    token: string;
}
