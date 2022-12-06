import { memo } from 'react';
import './styles/mvp.css';
import { Filter, Todo } from 'types';
import TodoItem from 'components/TodoItem';
import TodoForm from 'components/TodoForm';
import { nanoid } from 'nanoid';
import TodoCount from 'components/TodoCount';
import FilterButtons from 'components/FilterButtons';
import React from 'react';

interface AppState {
  todos: Todo[];
  activeFilter: Filter;
  todoCount: number;
}

class App extends React.PureComponent<{}, AppState> {
  state: Readonly<AppState> = {
    todos: [],
    activeFilter: 'all',
    todoCount: 0,
  };

  constructor(props) {
    super(props);
    this.state = { todos: [], activeFilter: 'all', todoCount: 0 };
  }

  componentDidMount(): void {
    this.setState(state => ({
      todoCount: state.todos.filter(todo => !todo.isDone).length,
    }));
  }

  componentDidUpdate(): void {
    this.setState(state => ({
      todoCount: state.todos.filter(todo => !todo.isDone).length,
    }));
  }

  private toggleTodoDone = (id: string): void => {
    const updatedTodos = this.state.todos.map(todos => {
      if (id === todos.id) {
        return { ...todos, isDone: !todos.isDone };
      }
      return todos;
    });
    this.setState({ todos: updatedTodos });
  };

  private handleFormSubmit = (formContent: string) => {
    const newTodo: Todo = {
      id: nanoid(),
      content: formContent,
      isDone: false,
    };
    const newTodosArray = [...this.state.todos, newTodo];
    this.setState({ todos: newTodosArray });
  };

  private handleFilterButtonClick = (clickedButton: Filter) => {
    this.setState({ activeFilter: clickedButton });
  };

  private filters: Record<Filter, (todo: Todo) => boolean> = {
    all: () => true,
    completed: todo => todo.isDone,
    active: todo => !todo.isDone,
  };

  render(): React.ReactNode {
    return (
      <main>
        <img src="nothing.png" alt="Just do nothing" width={'200x'} />
        <h1>Todon't</h1>
        <TodoForm onSubmit={this.handleFormSubmit} />
        <FilterButtons
          activeButton={this.state.activeFilter}
          onButtonClick={this.handleFilterButtonClick}
        />
        <TodoCount todoCount={this.state.todoCount} />
        <ul style={{ listStyle: 'none' }}>
          {this.state.todos
            .filter(this.filters[this.state.activeFilter])
            .map(todo => (
              <li key={todo.id}>
                <TodoItem todo={todo} toggleTodoDone={this.toggleTodoDone} />
              </li>
            ))}
        </ul>
      </main>
    );
  }
}

export default memo(App);
