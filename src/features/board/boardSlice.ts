import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { nanoid } from 'nanoid';
import { BoardType } from '../../types';

export interface Item {
  id: string;
  text: string;
  description: string;
}

export interface BoardState {
  todos: Item[];
  inProgress: Item[];
  done: Item[];
}

const initialState: BoardState = {
  todos: [
    {
      id: nanoid(),
      text: `Welcome Todo`,
      description: '',
    },
  ],
  inProgress: [],
  done: [],
};

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    addItem(
      state,
      action: PayloadAction<{
        boardType: BoardType;
        text: string;
      }>,
    ) {
      state[action.payload.boardType].push({
        id: nanoid(),
        text: action.payload.text,
        description: '',
      });
    },
    editItem(
      state,
      action: PayloadAction<{
        boardType: BoardType;
        item: {
          id: string;
          text?: string;
          description?: string;
        };
      }>,
    ) {
      let { boardType, item: editItem } = action.payload;
      let item = state[boardType].find((item) => item.id === editItem.id);
      if (item) {
        Object.assign(item, editItem);
      }
    },
    moveTo(
      state,
      action: PayloadAction<{
        source: {
          boardType: BoardType;
          index: number;
        };
        destination: {
          boardType: BoardType;
          index: number;
        };
      }>,
    ) {
      let { source, destination } = action.payload;
      let [item] = state[source.boardType].splice(source.index, 1);
      state[destination.boardType].splice(destination.index, 0, item);
    },
  },
});

export const { addItem, editItem, moveTo } = boardSlice.actions;

export const selectBoard = (type: BoardType) => (state: RootState) =>
  state.board[type];

export default boardSlice.reducer;
