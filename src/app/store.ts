import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import boardReducer from '../features/board/boardSlice';

export function createAppStore() {
  return configureStore({
    reducer: {
      board: boardReducer,
    },
  });
}

export const store = createAppStore();

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
