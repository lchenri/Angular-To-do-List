import { Tasks } from './../services/list.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Component, inject, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TablelistComponent } from './tablelist/tablelist.component';
import { Router } from '@angular/router';
import { ListService } from '../services/list.service';




@Component({
  selector: 'app-todolist',
  standalone: true,
  imports: [MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatTooltipModule,
    TablelistComponent],
  templateUrl: './todolist.component.html',
  styleUrl: './todolist.component.css'
})
export class TodolistComponent {
  @ViewChild('tablelist') tablelist!: TablelistComponent;
  private listService = inject(ListService);

  inputValue:string = '';
  task = new FormControl('', [Validators.required]);
  tasksSelected: Tasks[] = [];

  constructor(private router: Router){}

  getErrorMessage() {
    if(this.task.hasError('required')) {
      return 'Você deve inserir uma tarefa.';
    }

    return this.task.hasError('task') ? 'Not a valid task' : '';
  }

  saveTask(){
    //console.log(this.inputValue);
    this.listService.saveTask(this.inputValue);
    this.inputValue = '';
  }

  taskSelected(tasks: Tasks[]){
    this.tasksSelected = tasks;
  }

  deleteTask(){
    this.listService.deleteTask(this.tasksSelected);
    this.tablelist.clearSelection();
    this.tasksSelected = [];
  }

}
