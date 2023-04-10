import { Injectable } from '@angular/core';
import { TodoItem } from './todo-item';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  generateTodoItemKey(todo: TodoItem) {
    return `${todo.timestamp}&&${todo.title}&&${todo.id}`;
  }

  getAllTodoItems() {
    const todos: TodoItem[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.split('&&').length === 3) {
        const value = localStorage.getItem(key);
        todos.push(JSON.parse(value!));
      }
    }
    return todos.sort((a, b) => a.timestamp - b.timestamp);
  }

  addTodoItem(todo: TodoItem) {
    const key = this.generateTodoItemKey(todo);
    localStorage.setItem(key, JSON.stringify(todo));
  }

  updateTodoItem(todo: TodoItem) {
    const key = this.generateTodoItemKey(todo);
    localStorage.removeItem(key);
    localStorage.setItem(key, JSON.stringify(todo));
  }

  removeTodoItem(todo: TodoItem) {
    const key = this.generateTodoItemKey(todo);
    localStorage.removeItem(key);
  }
}
