import { Component } from '@angular/core';
import { ErrorRes } from 'src/app/api/contracts/error-response';
import { Todo } from './api/contracts/todo';
import { AppService } from './app.service';
import { TodoList } from './shared/models/todo-list';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  todoLists: TodoList[];
  allDropLists: string[];

  constructor(private service: AppService) {
    this.getTodos();
  }

  /**
   * Получение списка дел
   */
  getTodos() {
    this.service.getTodoList().subscribe(
      (res: Todo[]) => {
        this.todoLists = [
          {
            name: 'openedTodos',
            title: 'Нужно сделать',
            completed: false,
            todos: res.filter(todo => !todo.completed)
          },
          {
            name: 'completedTodos',
            title: 'Готово',
            completed: true,
            todos: res.filter(todo => todo.completed)
          }
        ];

        this.allDropLists = this.todoLists.map(item => item.name);
      },
      (error: ErrorRes) => {
        alert(error.message);
      }
    );
  }
}
