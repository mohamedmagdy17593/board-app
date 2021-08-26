import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import './App.scss';
import { useAppDispatch } from './app/hooks';

import Board from './components/Board/Board';
import { moveTo } from './features/board/boardSlice';
import { BoardType } from './types';

function App() {
  let dispatch = useAppDispatch();

  function handleDragEnd({ source, destination }: DropResult) {
    if (source && destination) {
      dispatch(
        moveTo({
          source: {
            boardType: source.droppableId as BoardType,
            index: source.index,
          },
          destination: {
            boardType: destination.droppableId as BoardType,
            index: destination.index,
          },
        }),
      );
    }
  }

  return (
    <div className="App">
      <DragDropContext onDragEnd={handleDragEnd}>
        <header className="App__header">
          <span>Task management board App</span>
        </header>

        <main className="App__main">
          <Board boardType="todos" name="To Do" canAdd />
          <Board boardType="inProgress" name="In Progress" />
          <Board boardType="done" name="Done" />
        </main>
      </DragDropContext>
    </div>
  );
}

export default App;
