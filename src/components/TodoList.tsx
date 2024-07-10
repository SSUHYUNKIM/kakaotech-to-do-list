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
        <div>
            {todos.map((todo) => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    toggleComplete={toggleComplete}
                    removeTodo={removeTodo}
                    editTodo={editTodo} // editTodo 함수 전달
                />
            ))}
        </div>
    );
};

export default TodoList;