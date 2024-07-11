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

const loadTodosFromLocalStorage = (): Todo[] => {
  const storedTodos = localStorage.getItem('todos');
  if (storedTodos) {
    try {
      return JSON.parse(storedTodos);
    } catch (error) {
      console.error("Failed to parse todos from localStorage:", error);
      return [];
    }
  }
  return [];
};

// 로컬 저장소에 할 일 목록을 저장하는 함수
const saveTodosToLocalStorage = (todos: Todo[]) => {
  localStorage.setItem('todos', JSON.stringify(todos));
};

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(loadTodosFromLocalStorage());
  const [filter, setFilter] = useState<Filter>('all');

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      text,
      completed: false
    };
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    saveTodosToLocalStorage(updatedTodos);
  };

  const toggleComplete = (id: number) => {
    const updatedTodos = todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
    saveTodosToLocalStorage(updatedTodos);
  };

  const removeTodo = (id: number) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    saveTodosToLocalStorage(updatedTodos);
  };

  const editTodo = (id: number, newText: string) => {
    const updatedTodos = todos.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo
    );
    setTodos(updatedTodos);
    saveTodosToLocalStorage(updatedTodos);
  };

  const removeAllTodos = () => {
    setTodos([]);
    saveTodosToLocalStorage([]);
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
      <main className="app-container">
        <header>
          <h1>Todo List</h1>
        </header>
        <section>
          <TodoInput addTodo={addTodo} />
          <TodoList
              todos={filteredTodos}
              toggleComplete={toggleComplete}
              removeTodo={removeTodo}
              editTodo={editTodo}
          />
          <button className="delete-all-button" onClick={removeAllTodos}>전체 삭제</button>
        </section>
        <footer>
          <p className="incomplete-count">남은 할 일: {incompleteCount}</p>
          <nav className="filters">
            <button
                className={`filter-button ${filter === 'all' ? 'active' : ''}`}
                onClick={() => setFilter('all')}
            >
              전체 할 일
            </button>
            <button
                className={`filter-button ${filter === 'active' ? 'active' : ''}`}
                onClick={() => setFilter('active')}
            >
              해야 할 일
            </button>
            <button
                className={`filter-button ${filter === 'completed' ? 'active' : ''}`}
                onClick={() => setFilter('completed')}
            >
              완료한 일
            </button>
          </nav>
        </footer>
      </main>
  );
};

export default App;
