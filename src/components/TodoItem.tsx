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
                    <button onClick={handleSave}>저장</button>
                    <button onClick={handleCancel}>취소</button>
                </>
            ) : (
                <>
                    <button onClick={handleEdit}>수정</button>
                    <button onClick={() => removeTodo(todo.id)}>삭제</button>
                </>
            )}
        </div>
    );
};

export default TodoItem;