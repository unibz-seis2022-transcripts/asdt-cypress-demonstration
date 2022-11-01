import { ReactElement } from 'react';
import { Todo } from 'types';

interface TodoProps {
  todo: Todo;
  toggleTodoDone: (id: number) => void;
}

export default function TodoItem({
  todo,
  toggleTodoDone,
}: TodoProps): ReactElement {
  return (
    <p
      className="todo-item"
      id={`todo-item-${todo.id}`}
      style={{ textDecoration: todo.isDone ? 'line-through' : '' }}
    >
      <input
        type={'checkbox'}
        defaultChecked={todo.isDone}
        onChange={() => toggleTodoDone(todo.id)}
      />{' '}
      {todo.content}
    </p>
  );
}
