import { useState } from 'react';
import './styles/mvp.css';
import { Todo } from 'types';
import TodoItem from 'components/TodoItem';
import TodoForm from 'components/TodoForm';
import { nanoid } from 'nanoid';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const toggleTodoDone = (id: string): void => {
    const updatedTodos = todos.map(todos => {
      if (id === todos.id) {
        return { ...todos, isDone: !todos.isDone };
      }
      return todos;
    });
    setTodos(updatedTodos);
  };

  const handleFormSubmit = (formContent: string) => {
    const newTodo: Todo = {
      id: nanoid(),
      content: formContent,
      isDone: false,
    };
    const newTodosArray = [...todos, newTodo];
    setTodos(newTodosArray);
  };

  return (
    <main>
      <TodoForm onSubmit={handleFormSubmit} />
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
