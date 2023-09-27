import React, { useState } from 'react';

export interface AddNewTodoProps {
    addNew: (name: string) => void;
}

export const AddNewTodo = (props: AddNewTodoProps) => {
    const { addNew } = props;
    const [name, setName] = useState('');

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onAddNew();
        }
    };

    const onAddNew = () => {
        addNew(name);
        setName('');
    };

    return (
        <div className="new-task">
            <input
                id="new-todo"
                type="text"
                name="text"
                placeholder="New task"
                autoComplete="off"
                autoFocus={true}
                value={name}
                onChange={handleNameChange}
                onKeyDown={handleKeyDown}
            />
            <button type="button" title="Add Task" onClick={onAddNew}>
                Add
            </button>
        </div>
    );
};