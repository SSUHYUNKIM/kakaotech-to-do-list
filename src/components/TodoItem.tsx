import React, { useState } from 'react';

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
        <div className="todo-item">
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
                    <button className="icon-button" onClick={handleSave}>✔️</button>
                    <button className="icon-button" onClick={handleCancel}>❌</button>
                </>
            ) : (
                <>
                    <button className="icon-button" onClick={handleEdit}>✏️</button>
                    <button className="icon-button" onClick={() => removeTodo(todo.id)}>❌</button>
                </>
            )}
        </div>
    );
};

export default TodoItem;