import React from 'react';
import TodoItem from './TodoItem';

interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

interface TodoListProps {
    todos: Todo[];
    toggleComplete: (id: number) => void;
    removeTodo: (id: number) => void;
    editTodo: (id: number, newText: string) => void; // editTodo 함수 추가
}

const TodoList: React.FC<TodoListProps> = ({ todos, toggleComplete, removeTodo, editTodo }) => {
    return (
        <ul>
            {todos.map((todo) => (
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
    );
};

export default TodoList;