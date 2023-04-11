import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

import { TodoItem } from '../todo-item.interface';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  todos: TodoItem[] = [];
  todos$ = new BehaviorSubject<TodoItem[]>([]);
  constructor(private storageService: StorageService) {
    this.todos = this.storageService.getAllTodoItems();
  }

  getLatestTodos() {
    this.todos$.next(this.todos);
  }

  clear() {
    this.todos = [];
    this.storageService.clear();
    this.todos$.next(this.todos);
  }

  addTodo(title: string) {
    const newTodo: TodoItem = {
      id: uuidv4(),
      title,
      completed: false,
      editing: false,
      timestamp: Date.now(),
    };

    this.todos.push(newTodo);
    this.storageService.addTodoItem(newTodo);
    this.todos$.next(this.todos);
  }

  removeTodo(removedTodo: TodoItem) {
    this.todos = this.todos.filter((todo) => todo.id !== removedTodo.id);
    this.storageService.removeTodoItem(removedTodo);
    this.todos$.next(this.todos);
  }

  toggleTodoCompleted(todo: TodoItem) {
    const updatedTodo = {
      ...todo,
      completed: !todo.completed,
    };

    this.storageService.updateTodoItem(updatedTodo);
    this.todos = this.todos.map((todo) => {
      if (todo.id === updatedTodo.id) {
        return updatedTodo;
      }
      return todo;
    });
    this.todos$.next(this.todos);
  }

  editTodoTitleById(id: string, title: string) {
    this.todos = this.todos.map((todo) => {
      if (todo.id === id) {
        this.storageService.removeTodoItem(todo);

        const updatedTodo: TodoItem = {
          ...todo,
          title,
          editing: false,
        };
        this.storageService.updateTodoItem(updatedTodo);

        return updatedTodo;
      }

      return todo;
    });
    this.todos$.next(this.todos);
  }

  removeCompleted() {
    this.todos = this.todos.filter((todo) => {
      if (todo.completed) {
        this.storageService.removeTodoItem(todo);
        return false;
      }
      return true;
    });
    this.todos$.next(this.todos);
  }

  toggleAllTodos() {
    const allCompleted = this.todos.every((todo) => todo.completed);
    this.todos = this.todos.map((todo) => {
      const updatedTodo = {
        ...todo,
        completed: !allCompleted,
      };
      this.storageService.updateTodoItem(updatedTodo);
      return updatedTodo;
    });
    this.todos$.next(this.todos);
  }
}
