import { TestBed } from '@angular/core/testing';

import { StorageService } from './storage.service';
import { TodoItem } from '../todo-item.interface';

describe('StorageService', () => {
  let service: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageService);
  });

  afterEach(() => {
    service.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should clear storage', () => {
    localStorage.setItem('test', 'test');
    service.clear();
    expect(localStorage.length).toBe(0);
  });

  it('should get item from storage', () => {
    const mockTodo: TodoItem = {
      id: '1',
      title: 'test',
      completed: false,
      timestamp: 1,
      editing: false,
    };
    service.addTodoItem(mockTodo);
    const allTodo = service.getAllTodoItems();
    expect(allTodo.length).toBe(1);
    expect(allTodo[0].completed).toBeFalse();
  });

  it('should sort items by timestamp', () => {
    const mockTodo1: TodoItem = {
      id: '1',
      title: 'test',
      completed: false,
      timestamp: 1,
      editing: false,
    };
    const mockTodo2: TodoItem = {
      id: '2',
      title: 'test',
      completed: false,
      timestamp: 2,
      editing: false,
    };
    service.addTodoItem(mockTodo1);
    service.addTodoItem(mockTodo2);
    const allTodo = service.getAllTodoItems();
    expect(allTodo.length).toBe(2);
    expect(allTodo[0].timestamp).toBeLessThan(allTodo[1].timestamp);
  });
});
