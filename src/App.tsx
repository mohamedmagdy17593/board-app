import './App.scss';

import Board from './components/Board/Board';

function App() {
  return (
    <div className="App">
      <header className="App__header">
        <span>Task management board App</span>
      </header>

      <main className="App__main">
        <Board />
      </main>
    </div>
  );
}

export default App;
