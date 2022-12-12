import { useEffect, useMemo, useState } from 'react';
import './styles/mvp.css';
import { Filter, Todo } from 'types';
import TodoItem from 'components/TodoItem';
import TodoForm from 'components/TodoForm';
import { nanoid } from 'nanoid';
import TodoCount from 'components/TodoCount';
import FilterButtons from 'components/FilterButtons';
import useMessageQueue from 'hooks/useMessageQueue';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [activeFilter, setActiveFilter] = useState<Filter>('all');
  const todoCount = useMemo(
    () => todos.filter(todo => !todo.isDone).length,
    [todos],
  );
  const remotelyAddedTodo = useMessageQueue('new-todos');
  const remotelyResolvedTodo = useMessageQueue('resolved-todos');

  useEffect(() => {
    if (remotelyAddedTodo) {
      setTodos(todos => {
        const newTodos: Todo[] = [
          ...todos,
          { content: remotelyAddedTodo, id: nanoid(), isDone: false },
        ];
        return newTodos;
      });
    }
  }, [remotelyAddedTodo]);

  useEffect(() => {
    if (remotelyResolvedTodo) {
      setTodos(todos => {
        // Todo: Find a nicer way to update the todos list
        const newTodos: Todo[] = [...todos];
        const todo = newTodos.find(todo =>
          todo.content.includes(remotelyResolvedTodo),
        );
        if (todo) {
          todo.isDone = true;
        }

        return newTodos;
      });
    }
  }, [remotelyResolvedTodo]);

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
