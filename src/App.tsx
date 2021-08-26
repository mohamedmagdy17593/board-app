import { useState } from 'react';
import { DragDropContext, DragStart, DropResult } from 'react-beautiful-dnd';
import './App.scss';
import { useAppDispatch } from './app/hooks';

import Board from './components/Board/Board';
import { moveTo } from './features/board/boardSlice';
import { BoardType } from './types';

function App() {
  let dispatch = useAppDispatch();

  let [draggedType, setDraggedType] = useState<BoardType | null>(null);

  function handleDragStart({ source }: DragStart) {
    setDraggedType(source.droppableId as BoardType);
  }

  function handleDragEnd({ source, destination }: DropResult) {
    // clear draggedType
    setDraggedType(null);

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
      <DragDropContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
        <header className="App__header">
          <span>Task management board App</span>
        </header>

        <main className="App__main">
          <Board
            boardType="todos"
            name="To Do"
            canAdd
            draggedType={draggedType}
          />
          <Board
            boardType="inProgress"
            name="In Progress"
            draggedType={draggedType}
          />
          <Board boardType="done" name="Done" draggedType={draggedType} />
        </main>
      </DragDropContext>
    </div>
  );
}

export default App;
