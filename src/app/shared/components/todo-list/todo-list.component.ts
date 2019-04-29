import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, ElementRef, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { PerfectScrollbarComponent } from 'ngx-perfect-scrollbar';
import { Todo } from '../../../api/contracts/todo';
import { TodoList } from '../../models/todo-list';
import { updateItemArray } from '../../utils/util-functions';
import { OverlayEditorService } from '../todo-editor/overlay-editor.service';
import { TodoEditorService } from '../todo-editor/todo-editor.service';
import { TodoListService } from './todo-list.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  @Input() todoList: TodoList;

  @Input() allDropLists; // Список всех имен дроп-листов

  @ViewChildren('textarea') textarea: QueryList<ElementRef>; // Список всех полей листа
  @ViewChildren('todoRefs') todoRefs: QueryList<ElementRef>; // Ссылки для крепления портала

  @ViewChild(PerfectScrollbarComponent) scroll: PerfectScrollbarComponent;

  /**
   * Идентификатор редактируемого элемента поля листа.
   * Редактировать можно только новое поле листа, пока не потерян фокус
   */
  editableId: number;

  constructor(
    private service: TodoListService,
    private overlayEditorService: OverlayEditorService,
    private editorServise: TodoEditorService
  ) {}

  ngOnInit(): void {
    this.subsribeToTodoChanges();
  }

  /**
   * Подписаться на изменения панели редактора элемента списка дел
   */
  subsribeToTodoChanges() {
    this.editorServise.todoChanged.subscribe(todo => {
      const todos = updateItemArray<Todo>(this.todoList.todos, todo);
      this.todoList.todos = todos;
    });
  }

  /**
   * Открывает панель редактора с элементом списка дел в портале
   * @param todo элемент
   */
  onEdit(todo: Todo) {
    const todoRef = this.todoRefs.find(item => item.nativeElement.id === `${todo.id}`);
    this.overlayEditorService.openEditor(todo, todoRef);
  }

  /**
   * Меняет позицию элемента в списке или перемещает в другой
   * @param event событие cdkDropList
   */
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
  }

  /**
   * Добавляет новый элемент в список
   */
  onAdd() {
    const todos = this.todoList.todos;
    const id = todos[todos.length - 1].id + 1;

    todos.push({ ...{ completed: this.todoList.completed, title: '', userId: 10 }, id });
    this.editableId = id;

    // закинуть в очередь
    setTimeout(_ => {
      this.scroll.directiveRef.scrollToBottom();
      this.textarea.last.nativeElement.focus();
    }, 0);
  }

  /**
   * Обработка потери фокуса поля ввода нового элемента
   * @param todo элемент списка
   */
  onBlur(todo: Todo) {
    this.editableId = null;
    todo.title = todo.title.trim();

    if (!todo.title.length) {
      this.todoList.todos.pop();
    } else {
      this.service.addTodo(todo).subscribe(_ => {}, error => {
        alert(error.message);
        this.todoList.todos.pop();
      });
    }
  }

  /**
   * Функция для оптимизации отрисовки элементов списка
   */
  trackByIndex(index: number, item): number {
    return index;
  }

  /**
   * Обработчик нажатия на enter для запрета переход на новую строку
   */
  onPreventDefault(e) {
    e.preventDefault();
  }
}
