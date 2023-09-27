import React from 'react';
import { TodoItem } from './TodoItem';
import { AddNewTodo } from './AddNewTodo';
import { nanoid } from 'nanoid';

export interface Todo {
    id: string,
    name: string,
    completed: boolean
}

export const Todos = () => {
    const [todos, setTodos] = React.useState<Todo[]>([{ id: "todo-1", name: "Walk the dog", completed: false }]);

    const addTodo = React.useCallback((name: string) => {
        const newTodo = { id: 'todo-' + nanoid(), name: name, completed: false };
        setTodos((todos) => [...todos, newTodo]);
    }, []);

    const onTaskCompleted = React.useCallback(
        (id: string) => {
            setTodos((todos) => {
                return todos.map((todo) => {
                    if (todo.id === id) {
                        return { ...todo, completed: !todo.completed };
                    } else {
                        return todo;
                    }
                });
            }
            );
        }, []
    );

    return (
        <div className="todo-list">
            <AddNewTodo addNew={addTodo} />
            {todos.map((item: Todo, index: number) => {
                return <TodoItem
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    completed={item.completed}
                    onTaskCompleted={onTaskCompleted}
                />
            })}
        </div>
    );
};