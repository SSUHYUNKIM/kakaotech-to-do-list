import React, { useState } from 'react';
import './TodoItem.css';

interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

interface TodoItemProps {
    todo: Todo;
    toggleComplete: (id: number) => void;
    removeTodo: (id: number) => void;
    editTodo: (id: number, newText: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, toggleComplete, removeTodo, editTodo }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newText, setNewText] = useState(todo.text);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        editTodo(todo.id, newText);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setNewText(todo.text);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewText(e.target.value);
    };

    return (
        <article className="todo-item">
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleComplete(todo.id)}
            />
            {isEditing ? (
                <input
                    type="text"
                    value={newText}
                    onChange={handleChange}
                />
            ) : (
                <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
          {todo.text}
        </span>
            )}
            {isEditing ? (
                <>
                    <button className="icon-button save-button" onClick={handleSave}>✔️</button>
                    <button className="icon-button cancel-button" onClick={handleCancel}>❌</button>
                </>
            ) : (
                <>
                    <button className="icon-button edit-button" onClick={handleEdit}>✏️</button>
                    <button className="icon-button delete-button" onClick={() => removeTodo(todo.id)}>❌</button>
                </>
            )}
        </article>
    );
};

export default TodoItem;
