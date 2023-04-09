import { Component, Input } from '@angular/core';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent{
  todoTitle: string;

  constructor(private todoService: TodoService) {
    this.todoTitle = '';
  }

  onKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.todoService.addTodo(this.todoTitle);
      this.todoTitle = '';
    }
  }
}
