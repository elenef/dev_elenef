import { TodoListName } from '../types/todo-list.type';
import { Todo } from '../../api/contracts/todo';

export interface TodoList {
    name: TodoListName;
    title: string;
    completed: boolean;
    todos: Todo[];
}
