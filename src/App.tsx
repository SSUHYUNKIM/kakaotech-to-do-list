import React, { useState } from 'react';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import './App.css';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

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

  return (
      <div className="app-container">
        <h1>Todo List</h1>
        <TodoInput addTodo={addTodo}/>
        <TodoList todos={todos} toggleComplete={toggleComplete} removeTodo={removeTodo}/>
        <button className="delete-all-button" onClick={removeAllTodos}>전체 삭제</button>
        <p className="incomplete-count">남은 할 일: {incompleteCount}</p>
      </div>
  );
};

export default App;
