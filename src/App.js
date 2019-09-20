import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import TodoUsingHooks from './components/TodoUsingHooks';

function App() {
  return (
    <div className="App">
      <div className="app-heading">Ingredients App using React Hooks</div>
      <header className="App-header">
        <TodoUsingHooks />
      </header>
    </div>
  );
}

export default App;
