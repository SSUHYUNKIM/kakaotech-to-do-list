import React from 'react';

interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

interface TodoItemProps {
    todo: Todo;
    toggleComplete: (id: number) => void;
    removeTodo: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, toggleComplete, removeTodo }) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <span onClick={() => toggleComplete(todo.id)} style={{ textDecoration: todo.completed ? 'line-through' : '' }}></span>
        <button onClick={() => removeTodo(todo.id)}>X</button>
        </div>
    );
};

export default TodoItem;