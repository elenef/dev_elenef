import { OverlayRef } from '@angular/cdk/overlay';
import { Component, ElementRef, Inject, InjectionToken, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TodoEditorService } from 'src/app/shared/components/todo-editor/todo-editor.service';
import { Todo } from '../../../api/contracts/todo';
import { cloneDeep } from '../../utils/util-functions';

export const TODO = new InjectionToken<Todo>('TODO');

@Component({
  selector: 'app-todo-editor',
  templateUrl: './todo-editor.component.html',
  styleUrls: ['./todo-editor.component.scss']
})
export class TodoEditorComponent implements OnInit {
  @ViewChild('textInput') textInput: ElementRef;

  textForm: FormGroup;
  todoCopy: Todo;

  get textControl() {
    return this.textForm.get('text');
  }

  constructor(private fb: FormBuilder, public overlayRef: OverlayRef, private service: TodoEditorService, @Inject(TODO) public todo: Todo) {
    this.todoCopy = cloneDeep<Todo>(todo);
  }

  /**
   * Функция выхода из редактора
   */
  onNoClick() {
    this.overlayRef.detach();
  }

  ngOnInit() {
    this.createForm();
    this.textInput.nativeElement.focus();
  }

  /**
   * Создает форму с текстовым полем ввода
   */
  createForm() {
    this.textForm = this.fb.group({
      text: this.createTextControl(this.todoCopy && this.todoCopy.title ? this.todoCopy.title : '')
    });
  }

  /**
   * Создает текстовое поле ввода
   */
  createTextControl(value = '') {
    return this.fb.control(value, [Validators.required, Validators.minLength(1), Validators.maxLength(256)]);
  }

  /**
   * Функция сохранения элемента списка дел
   */
  onSave(textForm: FormGroup) {
    if (textForm.valid) {
      this.todoCopy.title = this.textControl.value.trim();

      this.service.saveTodo(this.todoCopy).subscribe(
        _ => {
          this.service.todoChanged.next(this.todoCopy);
        },
        error => {
          alert(error.message);
        },
        () => {
          this.onNoClick();
        }
      );
    }
  }

  /**
   * Обработчик нажатия на enter для запрета переход на новую строку
   */
  onPreventDefault(e) {
    e.preventDefault();
  }
}
