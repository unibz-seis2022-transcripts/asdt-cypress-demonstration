import { ReactElement } from 'react';
import { Todo } from 'types';

interface TodoItemProps {
  todo: Todo;
  toggleTodoDone: (id: string) => void;
}

export default function TodoItem({
  todo,
  toggleTodoDone,
}: TodoItemProps): ReactElement {
  return (
    <div className="todo-item">
      <input
        id={`todo-checkbox-${todo.id}`}
        type={'checkbox'}
        defaultChecked={todo.isDone}
        onChange={() => toggleTodoDone(todo.id)}
      />{' '}
      <label
        className="todo-item-label"
        htmlFor={`todo-item-${todo.id}`}
        style={{ textDecoration: todo.isDone ? 'line-through' : '' }}
      >
        {todo.content}
      </label>
    </div>
  );
}
