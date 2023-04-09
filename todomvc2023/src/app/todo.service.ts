import { v4 as uuidv4 } from 'uuid';
import { Injectable } from '@angular/core';
import { FilterType, TodoItem } from './todo-item';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  todos: TodoItem[] = [
    {
      id: uuidv4(),
      title: 'Taste JavaScript',
      completed: true,
      editing: false,
      timestamp: Date.now(),
    },
    {
      id: uuidv4(),
      title: 'Buy a unicorn',
      completed: false,
      editing: false,
      timestamp: Date.now(),
    },
  ];
  constructor() {}

  addTodo(title: string) {
    this.todos.push({
      id: uuidv4(),
      title,
      completed: false,
      editing: false,
      timestamp: Date.now(),
    });
  }

  removeTodoById(id: string) {
    this.todos = this.todos.filter((todo) => todo.id !== id);
  }

  toggleTodoCompleted(id: string) {
    this.todos = this.todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }
      return todo;
    });
  }

  editTodoById(id: string) {
    this.todos = this.todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          editing: true,
        };
      }
      return {
        ...todo,
        editing: false,
      };
    });
  }

  editTodoTitleById(id: string, title: string) {
    this.todos = this.todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          title,
          editing: false,
        };
      }
      return todo;
    });
  }

  cancelEditingTodoById(id: string) {
    this.todos = this.todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          editing: false,
        };
      }
      return todo;
    });
  }

  filterTodos(filterType: FilterType) {
    switch (filterType) {
      case FilterType.All:
        return this.todos;
      case FilterType.Active:
        return this.todos.filter((todo) => !todo.completed);
      case FilterType.Completed:
        return this.todos.filter((todo) => todo.completed);
      default:
        return this.todos;
    }
  }

  removeCompleted() {
    this.todos = this.todos.filter((todo) => !todo.completed);
  }

  toggleAllTodos() {
    const allCompleted = this.todos.every((todo) => todo.completed);
    this.todos = this.todos.map((todo) => ({
      ...todo,
      completed: !allCompleted,
    }));
  }
}
