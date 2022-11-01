import React, { useEffect, useState } from 'react';
import './styles/mvp.css';
import { Todo } from 'types';
import TodoItem from 'components/TodoItem';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  useEffect(() => {
    if (todos.length === 0) {
      setTodos([
        { id: 1, content: 'foo bar', isDone: false },
        { id: 2, content: 'Take out the trash', isDone: false },
      ]);
    }
  }, [todos, setTodos]);

  const toggleTodoDone = (id: number): void => {
    const updatedTodos = todos.map(todos => {
      if (id === todos.id) {
        return { ...todos, isDone: !todos.isDone };
      }
      return todos;
    });
    setTodos(updatedTodos);
  };

  return (
    <main>
      <ul style={{ listStyle: 'none' }}>
        {todos.map((todo, index) => (
          <li key={index}>
            <TodoItem todo={todo} toggleTodoDone={toggleTodoDone} />
          </li>
        ))}
      </ul>
    </main>
  );
}

export default App;
