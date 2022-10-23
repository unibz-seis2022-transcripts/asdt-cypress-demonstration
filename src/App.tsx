import React, { useEffect, useState } from 'react';
import './styles/mvp.css';
import { Todo } from 'types';
import TodoItem from 'components/TodoItem';

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

  return (
    <main>
      {todos.map(todo => (
        <>
          <TodoItem todo={todo} /> <br />{' '}
        </>
      ))}
    </main>
  );
}

export default App;
