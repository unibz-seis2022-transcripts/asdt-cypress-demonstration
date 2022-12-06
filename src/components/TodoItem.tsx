import React from 'react';
import { ReactNode } from 'react';
import { Todo } from 'types';

interface TodoItemProps {
  todo: Todo;
  toggleTodoDone: (id: string) => void;
}

export default class TodoItem extends React.Component<TodoItemProps> {
  render(): ReactNode {
    return (
      <div className="todo-item">
        <input
          id={`todo-checkbox-${this.props.todo.id}`}
          type={'checkbox'}
          defaultChecked={this.props.todo.isDone}
          onChange={() => this.props.toggleTodoDone(this.props.todo.id)}
        />{' '}
        <label
          className="todo-item-label"
          htmlFor={`todo-item-${this.props.todo.id}`}
          style={{
            textDecoration: this.props.todo.isDone ? 'line-through' : '',
          }}
        >
          {this.props.todo.content}
        </label>
      </div>
    );
  }
}
