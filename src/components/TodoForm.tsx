import { FormEvent, ReactElement, useState } from 'react';

interface TodoFormProps {
  onSubmit: (newTodoContent: string) => void;
}

export default function TodoForm({ onSubmit }: TodoFormProps): ReactElement {
  const [inputContent, setInputContent] = useState('');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!inputContent) {
      return;
    }

    onSubmit(inputContent);
    setInputContent('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        id="new-todo-input"
        type={'text'}
        placeholder={'Add new todo'}
        onChange={event => setInputContent(event.target.value)}
        value={inputContent}
      />
      <button id="todo-submit-button">Create new todo</button>
    </form>
  );
}
