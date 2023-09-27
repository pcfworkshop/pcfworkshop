import React from 'react';
export interface TodoItemProps {
    id: string,
    name: string,
    completed: boolean,
    onTaskCompleted?: (id:string) => void
}

export const TodoItem = React.memo(({ id, name, completed, onTaskCompleted }: TodoItemProps) => {
    return (
        <div className={`todo-item ${completed ? ' completed' : ''}`}>
            <input
                id={id}
                type="checkbox"
                checked={completed}
                onChange={() => onTaskCompleted && onTaskCompleted(id)}
            />
            <label className="todo-label" htmlFor={id}>
                {name}
            </label>
        </div>
    );
});
TodoItem.displayName = 'TodoItem';