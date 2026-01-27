import { configureStore } from '@reduxjs/toolkit';
import Reducers from './reducers'; // Ensure proper export from ./reducers

// Configure the store
export const store = configureStore({
    reducer: {
        reducer: Reducers, // Use a meaningful name for the slice of state
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(), // Default middleware, plus any custom ones
});
