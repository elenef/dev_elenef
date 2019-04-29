import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/api/api.service';
import { ApiEndpoints } from './api/api-endpoints';
import { Todo } from './api/contracts/todo';
import { Observable } from 'rxjs/internal/Observable';
import { cloneDeepArray, updateItemArray } from './shared/utils/util-functions';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private api: ApiService) { }


  getTodoList(): Observable<Todo[] | object> {
    const url = ApiEndpoints.todos().listUrl();
    return this.api.get<Todo[]>(url);
  }



}
