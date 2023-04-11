import { TestBed } from '@angular/core/testing';

import { TodoService } from './todo.service';

describe('TodoService', () => {
  let service: TodoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoService);
  });

  afterEach(() => {
    service.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add todo', () => {
    service.addTodo('test');
    expect(service.todos.length).toBe(1);
  });

  it('should remove todo', () => {
    service.addTodo('test');
    const todo = service.todos[0];
    service.removeTodo(todo);
    expect(service.todos.length).toBe(0);
  });

  it('should toggle todo', () => {
    service.addTodo('test');
    const todo = service.todos[0];
    service.toggleTodoCompleted(todo);
    const updatedTodo = service.todos[0];
    expect(updatedTodo.completed).toBeTruthy();
  });
});
