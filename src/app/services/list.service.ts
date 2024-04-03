import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface Tasks {
  name: string;
  id: number;
}

const ELEMENT_DATA: Tasks[] = [];

@Injectable({
  providedIn: 'root'
})

export class ListService {

  constructor() { }

  private taskAddedSubject = new Subject<void>();
  taskAdded$ = this.taskAddedSubject.asObservable();

  private id:number = 1;

  notifyTaskAdded(){
    this.taskAddedSubject.next();
  }

  notifyTaskDeleted(){
    this.taskAddedSubject.next();
  }


  getTasks(){
    return ELEMENT_DATA;
  }

  saveTask(taskName: string){
    const newTask: Tasks = {
      id: this.id++,
      name: taskName
    }
    ELEMENT_DATA.push(newTask);
    this.notifyTaskAdded();
  }

  deleteTask(tasks: Tasks[]){
    tasks.forEach(task => {
      const index = ELEMENT_DATA.findIndex(element => element.id === task.id);
      if (index !== -1) {
        ELEMENT_DATA.splice(index, 1);
      }
    });
    this.notifyTaskDeleted();
  }


}
