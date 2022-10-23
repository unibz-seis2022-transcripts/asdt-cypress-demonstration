import { ReactElement } from 'react';
import { Todo } from 'types';

interface TodoProps {
  todo: Todo;
}

export default function TodoItem({ todo }: TodoProps): ReactElement {
  return (
    <>
      <input type={'checkbox'} checked={todo.isDone} /> {todo.content}
    </>
  );
}
