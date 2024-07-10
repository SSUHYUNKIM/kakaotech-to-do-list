import React, { useState } from 'react';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import './App.css';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

type Filter = 'all' | 'active' | 'completed';

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>('all');

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      text,
      completed: false
    };
    setTodos([...todos, newTodo]);
  };

  const toggleComplete = (id: number) => {
    setTodos(
        todos.map((todo) =>
          todo.id === id? {...todo, completed: !todo.completed} : todo
      )
    );
  };

  const removeTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const removeAllTodos = () => {
    setTodos([]);
  };

  const incompleteCount = todos.filter(todo => !todo.completed).length;

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') {
      return !todo.completed;
    }
    if (filter === 'completed') {
      return todo.completed;
    }
    return true;
  });

  return (
      <div className="app-container">
        <h1>Todo List</h1>
        <TodoInput addTodo={addTodo}/>
        <TodoList todos={filteredTodos} toggleComplete={toggleComplete} removeTodo={removeTodo} />
        <button className="delete-all-button" onClick={removeAllTodos}>전체 삭제</button>
        <p className="incomplete-count">남은 할 일: {incompleteCount}</p>
        <div className="filters">
          <button className={`filter-button ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>전체 할 일
          </button>
          <button className={`filter-button ${filter === 'active' ? 'active' : ''}`}
                  onClick={() => setFilter('active')}>해야 할 일
          </button>
          <button className={`filter-button ${filter === 'completed' ? 'active' : ''}`}
                  onClick={() => setFilter('completed')}>완료한 일
          </button>
        </div>
      </div>
  );
};

export default App;
