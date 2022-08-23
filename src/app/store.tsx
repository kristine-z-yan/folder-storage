import {configureStore} from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { storageReducer } from "../features/storage/storageSlice";

const store = configureStore({
    reducer: {
        'state': storageReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type RootState = ReturnType<typeof store.getState>

export default store;