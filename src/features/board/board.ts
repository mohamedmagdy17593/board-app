import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface Item {
  id: string;
  text: string;
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
  reducers: {},
});

export const {} = boardSlice.actions;

export const selectTodos = (state: RootState) => state.board.todos;

export default boardSlice.reducer;
