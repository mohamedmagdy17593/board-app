import { DragDropContext } from 'react-beautiful-dnd';
import './App.scss';

import Board from './components/Board/Board';

function App() {
  function handleDragEnd(...args: any[]) {
    console.log({ args });
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
