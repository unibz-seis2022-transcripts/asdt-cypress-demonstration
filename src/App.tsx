import { useMemo, useState } from 'react';
import './styles/mvp.css';
import { Filter, Todo } from 'types';
import TodoItem from 'components/TodoItem';
import TodoForm from 'components/TodoForm';
import { nanoid } from 'nanoid';
import TodoCount from 'components/TodoCount';
import FilterButtons from 'components/FilterButtons';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [activeFilter, setActiveFilter] = useState<Filter>('all');
  const todoCount = useMemo(
    () => todos.filter(todo => !todo.isDone).length,
    [todos],
  );

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

  const handleFilterButtonClick = (clickedButton: Filter) => {
    setActiveFilter(clickedButton);
  };

  const filters: Record<Filter, (todo: Todo) => boolean> = {
    all: () => true,
    completed: todo => todo.isDone,
    active: todo => !todo.isDone,
  };

  return (
    <main>
      <img src="nothing.png" alt="Just do nothing" width={'200x'} />
      <h1>Todon't</h1>
      <TodoForm onSubmit={handleFormSubmit} />
      <FilterButtons
        activeButton={activeFilter}
        onButtonClick={handleFilterButtonClick}
      />
      <TodoCount todoCount={todoCount} />
      <ul style={{ listStyle: 'none' }}>
        {todos.filter(filters[activeFilter]).map(todo => (
          <li key={todo.id}>
            <TodoItem todo={todo} toggleTodoDone={toggleTodoDone} />
          </li>
        ))}
      </ul>
    </main>
  );
}

export default App;
