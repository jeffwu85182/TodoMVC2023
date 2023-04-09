import { Injectable } from '@angular/core';
import { TodoItem } from './todo-item';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todos: TodoItem[] = [
    {
      id: 1,
      title: 'Taste JavaScript',
      completed: true,
      editing: false
    },
    {
      id: 2,
      title: 'Buy a unicorn',
      completed: false,
      editing: false
    },
  ];
  constructor() { }

  addTodo(title: string) {
    this.todos.push({
      id: this.todos.length + 1,
      title,
      completed: false,
      editing: false
    });
  }

  removeTodoById(id: number) {
    this.todos = this.todos.filter(todo => todo.id !== id);
  }

  toggleTodoCompleted(id: number) {
    this.todos = this.todos.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed
        };
      }
      return todo;
    });
  }
}
