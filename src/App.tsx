import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './styles/mvp.css';
import { Todo } from 'types';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  useEffect(() => {
    if (todos.length === 0) {
      setTodos([
        { content: 'foo bar', isDone: false },
        { content: 'Take out the trash', isDone: true },
      ]);
    }
  }, [todos, setTodos]);

  const renderedTodos = todos.map(todo => (
    <li key={todo.content}>
      {todo.content}: {todo.isDone ? 'true' : 'false'}
    </li>
  ));

  return (
    <main>
      <h3>To-dos: </h3>
      <ul>{renderedTodos}</ul>
    </main>
  );
}

export default App;
