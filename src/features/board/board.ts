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
  todos: [
    {
      id: nanoid(),
      text: `
Lorem ipsum dolor sit amet, consectetur adipiscing elit,
sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
      `,
      description: '',
    },
    //     {
    //       id: nanoid(),
    //       text: `
    // Lorem ipsum dolor sit amet, consectetur adipiscing elit,
    // sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    // Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    // Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
    // Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
    //       `,
    //       description: '',
    //     },
    //     {
    //       id: nanoid(),
    //       text: `
    // Lorem ipsum dolor sit amet, consectetur adipiscing elit,
    // sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    // Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    // Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
    // Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
    //       `,
    //       description: '',
    //     },
    //     {
    //       id: nanoid(),
    //       text: `
    // Lorem ipsum dolor sit amet, consectetur adipiscing elit,
    // sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    // Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    // Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
    // Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
    //       `,
    //       description: '',
    //     },
  ],
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
    editItem(
      state,
      action: PayloadAction<{
        id: string;
        text?: string;
        description?: string;
      }>,
    ) {
      let item = state.todos.find((item) => item.id === action.payload.id);
      if (item) {
        Object.assign(item, action.payload);
      }
    },
  },
});

export const { addItem, editItem } = boardSlice.actions;

export const selectTodos = (state: RootState) => state.board.todos;

export default boardSlice.reducer;
