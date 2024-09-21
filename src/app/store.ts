import { configureStore } from '@reduxjs/toolkit';
import todoReducer from '../slices/todoSlice';

export const store = configureStore({
    reducer: {
        todo: todoReducer,
    },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
