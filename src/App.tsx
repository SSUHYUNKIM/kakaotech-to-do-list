import React from 'react';
import TodoList from './components/TodoList';
import './App.css';

const App: React.FC = () => {
  return (
      <main className="app-container">
        <header>
          <h1>Todo List</h1>
        </header>
        <section>
          <TodoList />
        </section>
      </main>
  );
};

export default App;
