import { Component } from '@angular/core';
import { TodoService } from './todo.service';
import { FilterType } from './todo-item';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  todos = this.todoService.todos;
  currentFilterType = FilterType.All;
  constructor(private todoService: TodoService) {}

  get totalTodosNumber() {
    return this.todoService.todos.length;
  }

  get remainingTodosNumber() {
    return this.todoService.todos.filter((todo) => !todo.completed).length;
  }

  get completedTodosNumber() {
    return this.todoService.todos.filter((todo) => todo.completed).length;
  }

  removeTodoById(id: string) {
    this.todoService.removeTodoById(id);
    this.todos = this.todoService.filterTodos(this.currentFilterType);
  }

  toggleTodoCompleted(id: string) {
    this.todoService.toggleTodoCompleted(id);
    this.todos = this.todoService.filterTodos(this.currentFilterType);
  }

  editTodoById(id: string) {
    this.todoService.editTodoById(id);
    this.todos = this.todoService.filterTodos(this.currentFilterType);
  }

  cancelEditingTodoById(id: string) {
    this.todoService.cancelEditingTodoById(id);
    this.todos = this.todoService.filterTodos(this.currentFilterType);
  }

  editTodoTitleById(id: string, title: string) {
    this.todoService.editTodoTitleById(id, title);
    this.todos = this.todoService.filterTodos(this.currentFilterType);
  }

  filterTodos(filterType: string) {
    this.currentFilterType = filterType as FilterType;
    this.todos = this.todoService.filterTodos(this.currentFilterType);
  }

  removeCompleted() {
    this.todoService.removeCompleted();
    this.todos = this.todoService.todos;
  }
}
