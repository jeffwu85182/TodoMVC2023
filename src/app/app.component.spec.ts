import { TestBed } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { StorageService } from './services/storage.service';
import { TodoService } from './services/todo.service';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent, AppComponent],
      providers: [TodoService, StorageService],
    }).compileComponents();
  });

  afterEach(() => {
    const todoService = TestBed.inject(TodoService);
    todoService.clear();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'todomvc2023'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.todos.length).toBe(0);
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('todo');
  });

  it('should render toggle-all when list has item', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const todoService = fixture.debugElement.injector.get(TodoService);
    todoService.addTodo('test');
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.toggle-all')).toBeTruthy();
  });

  it('should render footer when list has item', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const todoService = fixture.debugElement.injector.get(TodoService);
    todoService.addTodo('test');
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.footer')).toBeTruthy();
  });

  it('should render clear-completed when list has item', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const todoService = fixture.debugElement.injector.get(TodoService);
    todoService.addTodo('test');
    fixture.detectChanges();
    const toggleButton = fixture.nativeElement.querySelector('.toggle');
    toggleButton.click();
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.clear-completed')).toBeTruthy();
  });

  it('should remove todo when click remove button', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const todoService = fixture.debugElement.injector.get(TodoService);
    todoService.addTodo('test');
    fixture.detectChanges();
    const removeButton = fixture.nativeElement.querySelector('.destroy');
    removeButton.click();
    fixture.detectChanges();
    expect(todoService.todos.length).toBe(0);
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.main')).toBeFalsy();
  });

  it('should toggle todo when click toggle button', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const todoService = fixture.debugElement.injector.get(TodoService);
    todoService.addTodo('test');
    fixture.detectChanges();
    const toggleButton = fixture.nativeElement.querySelector('.toggle');
    toggleButton.click();
    fixture.detectChanges();
    expect(todoService.todos[0].completed).toBeTruthy();
  });

  it('should edit todo when double click todo item', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const todoService = fixture.debugElement.injector.get(TodoService);
    todoService.addTodo('test');
    fixture.detectChanges();
    const todoItem = fixture.nativeElement.querySelector('.view');
    todoItem.dispatchEvent(new Event('dblclick'));
    fixture.detectChanges();
    const editInput = fixture.nativeElement.querySelector('.edit');
    editInput.value = 'test2';
    editInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    fixture.detectChanges();
    expect(todoService.todos[0].title).toBe('test2');
  });

  it('should cancel edit todo when press escape', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const todoService = fixture.debugElement.injector.get(TodoService);
    todoService.addTodo('test');
    fixture.detectChanges();
    const todoItem = fixture.nativeElement.querySelector('.view');
    todoItem.dispatchEvent(new Event('dblclick'));
    fixture.detectChanges();
    const editInput = fixture.nativeElement.querySelector('.edit');
    editInput.value = 'test2';
    editInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    fixture.detectChanges();
    expect(todoService.todos[0].title).toBe('test');
  });

  it('should clear completed todos when click clear completed button', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const todoService = fixture.debugElement.injector.get(TodoService);
    todoService.addTodo('test');
    todoService.addTodo('test2');
    fixture.detectChanges();
    const toggleButton = fixture.nativeElement.querySelector('.toggle');
    toggleButton.click();
    fixture.detectChanges();
    const clearCompletedButton = fixture.nativeElement.querySelector('.clear-completed');
    clearCompletedButton.click();
    fixture.detectChanges();
    expect(todoService.todos.length).toBe(1);
  });

  it('should toggle all todos when click toggle all button', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const todoService = fixture.debugElement.injector.get(TodoService);
    todoService.addTodo('test');
    todoService.addTodo('test2');
    fixture.detectChanges();
    const toggleAllButton = fixture.nativeElement.querySelector('label[for="toggle-all"]');
    toggleAllButton.click();
    fixture.detectChanges();
    expect(todoService.todos[0].completed).toBeTruthy();
    expect(todoService.todos[1].completed).toBeTruthy();
  });

  it('should filter todos when click filter button', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const todoService = fixture.debugElement.injector.get(TodoService);
    todoService.addTodo('test');
    todoService.addTodo('test2');
    fixture.detectChanges();
    // check left description
    expect(fixture.nativeElement.querySelector('.todo-count').textContent).toBe('2 items left');

    // toggle 2nd todo
    const toggleButton = fixture.nativeElement.querySelectorAll('.toggle')[1];
    toggleButton.click();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.todo-count').textContent).toBe('1 item left');

    // click all filter button
    const filterAllButton = fixture.nativeElement.querySelector('.filters .all');
    filterAllButton.click();
    const todoList = fixture.nativeElement.querySelector('.todo-list');
    expect(todoList.children.length).toBe(2);

    // click active filter button
    const filterCompletedButton = fixture.nativeElement.querySelector('.filters .active');
    filterCompletedButton.click();
    fixture.detectChanges();
    expect(todoList.children.length).toBe(1);

    // click completed filter button
    const filterActiveButton = fixture.nativeElement.querySelector('.filters .completed');
    filterActiveButton.click();
    fixture.detectChanges();
    expect(todoList.children.length).toBe(1);
  });
});
