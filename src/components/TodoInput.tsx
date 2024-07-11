import React, { useState, ChangeEvent, FormEvent } from 'react';

interface TodoInputProps {
    addTodo: (text: string) => void;
}

const TodoInput: React.FC<TodoInputProps> = ({ addTodo }) => {
    const [inputValue, setInputValue] = useState<string>('');

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (inputValue.trim()) {
            addTodo(inputValue);
            setInputValue('');
        } else {
            alert('할 일을 입력하세요.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={inputValue}
                onChange={handleChange}
                placeholder="Enter a new task"
            />
            <button type="submit">Add</button>
        </form>
    );
};

export default TodoInput;
