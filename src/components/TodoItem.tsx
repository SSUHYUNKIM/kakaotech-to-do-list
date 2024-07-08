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
        <div style={{textDecoration: todo.completed ? 'line-through' : 'none'}}>
            <span onClick={() => toggleComplete(todo.id)}>{todo.text}</span>
            <button onClick={() => removeTodo(todo.id)}>X</button>
        </div>
    );
};

export default TodoItem;