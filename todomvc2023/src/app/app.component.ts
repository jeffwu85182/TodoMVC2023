import { Component } from '@angular/core';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'todomvc2023';
  todos = this.todoService.todos;
  constructor(private todoService: TodoService){
  }

  removeTodoById(id: string) {
    this.todoService.removeTodoById(id);
    this.todos = this.todoService.todos;
  }

  toggleTodoCompleted(id: string) {
    this.todoService.toggleTodoCompleted(id);
    this.todos = this.todoService.todos;
  }

}
