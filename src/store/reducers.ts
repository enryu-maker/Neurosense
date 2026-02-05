import { UnknownAction } from "@reduxjs/toolkit";

interface AuthState {
    access: string | null;
    profile: any | null;
}

const initialState: AuthState = {
    access: null,
    profile: null,
};

export default (state = initialState, action: UnknownAction & { payload?: any }): AuthState => {
    switch (action.type) {
        case 'SET_ACCESS':
            return { ...state, access: action.payload };
        case 'SET_PROFILE':
            return { ...state, profile: action.payload };
        default:
            return state;
    }
};
