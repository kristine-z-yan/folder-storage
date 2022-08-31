import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { storageReducer } from "../features/storage/storageSlice";
import { loadState } from "../localStorage";

const store = configureStore({
    reducer: {
        'state': storageReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    preloadedState: loadState()
});

export type RootState = ReturnType<typeof store.getState>

export default store;