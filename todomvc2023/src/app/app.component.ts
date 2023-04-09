import { Component } from '@angular/core';
import { TodoService } from './todo.service';
import { FilterType } from './todo-item';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'todomvc2023';
  todos = this.todoService.todos;
  currentFilterType = FilterType.All;
  constructor(private todoService: TodoService){
  }

  get remainingTodos() {
    return this.todos.filter((todo) => !todo.completed).length;
  }

  removeTodoById(id: string) {
    this.todoService.removeTodoById(id);
    this.todos = this.todoService.todos;
  }

  toggleTodoCompleted(id: string) {
    this.todoService.toggleTodoCompleted(id);
    this.todos = this.todoService.todos;
  }

  editTodoById(id: string) {
    this.todoService.editTodoById(id);
    this.todos = this.todoService.todos;
  }

  cancelEditingTodoById(id: string) {
    this.todoService.cancelEditingTodoById(id);
    this.todos = this.todoService.todos;
  }

  editTodoTitleById(id: string, title: string) {
    this.todoService.editTodoTitleById(id, title);
    this.todos = this.todoService.todos;
  }

  filterTodos(filterType: string) {
    this.currentFilterType = filterType as FilterType;
    this.todos = this.todoService.filterTodos(this.currentFilterType);
  }

}
