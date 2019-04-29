import { ApiEndpoints } from 'src/app/api/api-endpoints';
import { Injectable } from '@angular/core';
import { ApiService } from '../../../api/api.service';
import { Todo } from '../../../api/contracts/todo';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class TodoListService {

  constructor(
    private api: ApiService
  ) { }

  addTodo(todo: Todo): Observable<Todo | object> {
    //const url = ApiEndpoints.todos().itemUrl(`${todo.id}`);
    const url = ApiEndpoints.todos().listUrl();
    return this.api.post(url, todo);
  }
}
