import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo, TodoState } from '../types/types';

const initialState: TodoState = {
    todo: [],
};

export const todoSlice = createSlice({
    name: 'todoSlice',
    initialState,
    reducers: {
        getAll: (state, action: PayloadAction<Todo[]>) => {
            state.todo = action.payload;
        },
        addTodo: (state, action: PayloadAction<{ task: string; id: string | number, isCompleted: boolean }>) => {
            state.todo.push({
                task: action.payload.task,
                id: action.payload.id,
                isCompleted: false
            });
        },
        editTodo: (state, action: PayloadAction<{ id: string | number; task: string; isCompleted: boolean }>) => {
            const { id, task, isCompleted } = action.payload;
            const existingTodo = state.todo.find(todo => todo.id === id);
            if (existingTodo) {
                existingTodo.task = task;
                existingTodo.isCompleted = isCompleted;
            }
        },

        deleteTodo: (state, action: PayloadAction<string | number>) => {
            state.todo = state.todo.filter(todo => todo.id !== action.payload);
        },
        clearAllTasks(state) {
            state.todo = [];
        },
    },
});

export const { getAll, addTodo, editTodo, deleteTodo, clearAllTasks } = todoSlice.actions;
export default todoSlice.reducer;
