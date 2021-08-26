import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import boardReducer from '../features/board/boardSlice';

export const store = configureStore({
  reducer: {
    board: boardReducer,
  },
});

store.subscribe(() => {
  console.log('newState', JSON.stringify(store.getState()));
  localStorage.setItem(
    '__redux-management-board-store',
    JSON.stringify(store.getState()),
  );
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
