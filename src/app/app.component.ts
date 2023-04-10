import { Component } from '@angular/core';

import { FilterType, TodoItem } from './todo-item';
import { TodoService } from './todo.service';
import { NgIf, NgFor, NgClass } from '@angular/common';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [HeaderComponent, NgIf, NgFor, NgClass],
})
export class AppComponent {
  currentFilterType = FilterType.All;

  constructor(private todoService: TodoService) {}

  get todos(): TodoItem[] {
    return this.todoService.filterTodos(this.currentFilterType);
  }

  get totalTodosNumber() {
    return this.todoService.todos.length;
  }

  get remainingTodosNumber() {
    return this.todoService.todos.filter((todo) => !todo.completed).length;
  }

  get completedTodosNumber() {
    return this.todoService.todos.filter((todo) => todo.completed).length;
  }

  removeTodo(todo: TodoItem) {
    this.todoService.removeTodo(todo);
  }

  toggleTodoCompleted(id: string) {
    this.todoService.toggleTodoCompleted(id);
  }

  editTodoTitleById(id: string, title: string) {
    this.todoService.editTodoTitleById(id, title);
  }

  filterTodos(filterType: string) {
    if (filterType === this.currentFilterType) return;
    this.currentFilterType = filterType as FilterType;
  }

  removeCompleted() {
    this.todoService.removeCompleted();
  }

  trackByTodoId(index: number, todo: TodoItem) {
    return todo.id;
  }

  toggleAll() {
    this.todoService.toggleAllTodos();
  }
}
