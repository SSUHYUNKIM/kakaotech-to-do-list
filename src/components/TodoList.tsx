import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';
import TodoInput from './TodoInput';
import './TodoList.css';

interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

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

const saveTodosToLocalStorage = (todos: Todo[]) => {
    localStorage.setItem('todos', JSON.stringify(todos));
};

const TodoList: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>(loadTodosFromLocalStorage());
    const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

    useEffect(() => {
        saveTodosToLocalStorage(todos);
    }, [todos]);

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
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    const removeTodo = (id: number) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    const editTodo = (id: number, newText: string) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, text: newText } : todo
            )
        );
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
        <div>
            <TodoInput addTodo={addTodo} />
            <ul>
                {filteredTodos.map((todo) => (
                    <li key={todo.id}>
                        <TodoItem
                            todo={todo}
                            toggleComplete={toggleComplete}
                            removeTodo={removeTodo}
                            editTodo={editTodo}
                        />
                    </li>
                ))}
            </ul>
            <button className="delete-all-button" onClick={removeAllTodos}>전체 삭제</button>
            <p className="incomplete-count">남은 할 일: {incompleteCount}</p>
            <div className="filters">
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
            </div>
        </div>
    );
};

export default TodoList;