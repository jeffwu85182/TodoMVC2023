import { Component } from '@angular/core';
import { TodoService } from './todo.service';
import { FilterType } from './todo-item';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  currentFilterType = FilterType.All;
  
  constructor(private todoService: TodoService) {}

  get todos() {
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

  removeTodoById(id: string) {
    this.todoService.removeTodoById(id);
  }

  toggleTodoCompleted(id: string) {
    this.todoService.toggleTodoCompleted(id);
  }

  editTodoById(id: string) {
    this.todoService.editTodoById(id);
  }

  cancelEditingTodoById(id: string) {
    this.todoService.cancelEditingTodoById(id);
  }

  editTodoTitleById(id: string, title: string) {
    this.todoService.editTodoTitleById(id, title);
  }

  filterTodos(filterType: string) {
    this.currentFilterType = filterType as FilterType;
  }

  removeCompleted() {
    this.todoService.removeCompleted();
  }
}
