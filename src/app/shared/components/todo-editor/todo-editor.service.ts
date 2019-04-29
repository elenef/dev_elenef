import { Injectable } from '@angular/core';
import { Todo } from '../../../api/contracts/todo';
import { ApiService } from '../../../api/api.service';
import { Observable, ReplaySubject } from 'rxjs';
import { ApiEndpoints } from 'src/app/api/api-endpoints';

@Injectable({
  providedIn: 'root'
})
export class TodoEditorService {
  todoChanged: ReplaySubject<Todo>;

  constructor(
    private api: ApiService
  ) {
    this.todoChanged = new ReplaySubject();
  }

  saveTodo(todo: Todo): Observable<Todo | object> {
    const url = ApiEndpoints.todos().itemUrl(`${todo.id}`);
    return this.api.put(url, todo);
  }
}
