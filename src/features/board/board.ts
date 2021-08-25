import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { nanoid } from 'nanoid';

export interface Item {
  id: string;
  text: string;
  description: string;
}

export interface BoardState {
  todos: Item[];
}

const initialState: BoardState = {
  todos: [],
};

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<string>) {
      state.todos.push({
        id: nanoid(),
        text: action.payload,
        description: '',
      });
    },
  },
});

export const { addItem } = boardSlice.actions;

export const selectTodos = (state: RootState) => state.board.todos;

export default boardSlice.reducer;
