import { v4 as uuidv4 } from 'uuid';
import { Injectable } from '@angular/core';
import { FilterType, TodoItem } from './todo-item';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  todos: TodoItem[] = [];
  constructor(private storageService: StorageService) {
    this.todos = this.storageService.getAllTodoItems();
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
  }

  removeTodo(removedTodo: TodoItem) {
    this.todos = this.todos.filter((todo) => todo.id !== removedTodo.id);
    this.storageService.removeTodoItem(removedTodo);
  }

  toggleTodoCompleted(id: string) {
    this.todos = this.todos.map((todo) => {
      if (todo.id === id) {
        const updatedTodo = {
          ...todo,
          completed: !todo.completed,
        };

        this.storageService.updateTodoItem(updatedTodo);

        return updatedTodo;
      }

      return todo;
    });
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
    this.todos = this.todos.filter((todo) => {
      if (todo.completed) {
        this.storageService.removeTodoItem(todo);
        return false;
      }
      return true;
    });
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
  }
}
