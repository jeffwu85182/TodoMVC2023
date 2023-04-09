import { v4 as uuidv4 } from 'uuid';
import { Injectable } from '@angular/core';
import { TodoItem } from './todo-item';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todos: TodoItem[] = [
    {
      id: 'mark1',
      title: 'Taste JavaScript',
      completed: true,
      editing: false
    },
    {
      id: 'mark2',
      title: 'Buy a unicorn',
      completed: false,
      editing: false
    },
  ];
  constructor() { }

  addTodo(title: string) {
    this.todos.push({
      id: uuidv4(),
      title,
      completed: false,
      editing: false
    });
  }

  removeTodoById(id: string) {
    this.todos = this.todos.filter(todo => todo.id !== id);
  }

  toggleTodoCompleted(id: string) {
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
