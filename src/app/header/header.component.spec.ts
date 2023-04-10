import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoService } from '../services/todo.service';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [TodoService],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    const todoService = TestBed.inject(TodoService);
    todoService.clear();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have placegolder', () => {
    const input = fixture.nativeElement.querySelector('input');
    expect(input.placeholder).toBe('What needs to be done?');
  });

  it('should have autofocus', () => {
    const input = fixture.nativeElement.querySelector('input');
    expect(input.autofocus).toBeTruthy();
  });

  it('should have empty value', () => {
    const input = fixture.nativeElement.querySelector('input');
    expect(input.value).toBe('');
  });

  it('should add todo', () => {
    const todoService = TestBed.inject(TodoService);
    const input = fixture.nativeElement.querySelector('input');
    input.value = 'test';
    input.dispatchEvent(new Event('input'));
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    expect(todoService.todos.length).toBe(1);
  });
});
