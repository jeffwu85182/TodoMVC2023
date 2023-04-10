import { Component, ElementRef, ViewChild } from '@angular/core';

import { TodoService } from '../todo.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
})
export class HeaderComponent {
  @ViewChild('todoInputRef') todoInput!: ElementRef<HTMLInputElement>;
  constructor(private todoService: TodoService) {}

  addTodo(title: string) {
    this.todoService.addTodo(title);
    const inputElement = this.todoInput.nativeElement;
    inputElement.value = '';
  }
}
