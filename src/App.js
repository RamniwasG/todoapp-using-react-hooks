import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import TodoAppTabs from './components/tabs/Tabs';

function App() {
  return (
    <div className="App">
      <div className="app-heading">Ingredients App using React Hooks</div>
      <TodoAppTabs />
    </div>
  );
}

export default App;
