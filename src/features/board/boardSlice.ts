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

/**
 * init state
 */

function getStoreState() {
  try {
    let oldStore = localStorage.getItem('__redux-management-board-store');
    if (oldStore) {
      return JSON.parse(oldStore);
    }
  } catch (e) {
    console.error(e);
  }
}

let initialState: BoardState = {
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

let oldStoreState = getStoreState();
if (oldStoreState) {
  // simple validating over local storage state
  if (initialState.todos && initialState.done && initialState.inProgress) {
    initialState = oldStoreState.board;
    console.log('oldBoardState', initialState);
  }
}

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
    deleteItem(
      state,
      action: PayloadAction<{
        boardType: BoardType;
        itemId: string;
      }>,
    ) {
      let { boardType, itemId } = action.payload;
      state[boardType] = state[boardType].filter((item) => item.id !== itemId);
    },
  },
});

export const { addItem, editItem, moveTo, deleteItem } = boardSlice.actions;

export const selectBoard = (type: BoardType) => (state: RootState) =>
  state.board[type];

export default boardSlice.reducer;
