import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { FilterType } from './constant';
import { HeaderComponent } from './header/header.component';
import { TodoService } from './services/todo.service';
import { TodoItem } from './todo-item.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [HeaderComponent, NgIf, NgFor, NgClass],
})
export class AppComponent implements OnInit {
  currentFilterType = FilterType.All;
  private originalTodos: TodoItem[] = [];
  todos: TodoItem[] = [];
  totalTodosNumber = 0;
  remainingTodosNumber = 0;
  completedTodosNumber = 0;
  renderTimes = 0;
  constructor(private todoService: TodoService) {}

  // count the render times
  // ngAfterViewChecked(): void {
  //   console.log('render', ++this.renderTimes);
  // }

  ngOnInit(): void {
    this.todoService.todos$.subscribe({
      next: (todos) => {
        this.originalTodos = todos;
        this.todos = todos;
        this.totalTodosNumber = todos.length;
        this.remainingTodosNumber = todos.filter((todo) => !todo.completed).length;
        this.completedTodosNumber = this.totalTodosNumber - this.remainingTodosNumber;
      },
    });

    this.todoService.getLatestTodos();
  }

  removeTodo(todo: TodoItem) {
    this.todoService.removeTodo(todo);
  }

  toggleTodoCompleted(todo: TodoItem) {
    this.todoService.toggleTodoCompleted(todo);
  }

  editTodoTitleById(id: string, title: string) {
    this.todoService.editTodoTitleById(id, title);
  }

  filterTodos(filterType: string) {
    if (filterType === this.currentFilterType) return;
    this.currentFilterType = filterType as FilterType;
    switch (this.currentFilterType) {
      case FilterType.Active:
        this.todos = this.originalTodos.filter((todo) => !todo.completed);
        break;
      case FilterType.Completed:
        this.todos = this.originalTodos.filter((todo) => todo.completed);
        break;
      default:
        this.todos = this.originalTodos;
    }
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
