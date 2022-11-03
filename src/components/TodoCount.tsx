import { ReactElement } from 'react';

interface TodoCountProps {
  todoCount: number;
}

export default function TodoCount({ todoCount }: TodoCountProps): ReactElement {
  let message: string;
  switch (todoCount) {
    case 0:
      message = 'All done!';
      break;
    case 1:
      message = 'Only 1 task remaining';
      break;
    default:
      message = `${todoCount} tasks remaining`;
      break;
  }

  return <p id="todo-count-label">{message}</p>;
}
