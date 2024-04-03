import { ListService, Tasks } from './../../services/list.service';
import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {SelectionModel} from '@angular/cdk/collections';



@Component({
  selector: 'app-tablelist',
  standalone: true,
  imports: [MatTableModule, MatCheckboxModule],
  templateUrl: './tablelist.component.html',
  styleUrl: './tablelist.component.css'
})


export class TablelistComponent implements OnInit{
  private listService = inject(ListService);
  displayedColumns: string[] = ['select', 'id', 'name'];
  dataSource = new MatTableDataSource<Tasks>(this.listService.getTasks());
  selection = new SelectionModel<Tasks>(true, []);

  @Input() tarefa: string = '';
  @Output() tarefaSelecionada = new EventEmitter<Tasks[]>();

  ngOnInit(){
    this.listService.taskAdded$.subscribe(() => {
      this.updateDataSource();
    })
  }


  checkboxLabel(row: Tasks): string {
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} all`;
  }

  updateDataSource(){
    this.dataSource = new MatTableDataSource<Tasks>(this.listService.getTasks());
  }

  taskSelected(){
    this.tarefaSelecionada.emit(this.selection.selected);
  }

  clearSelection(){
    this.selection.clear();
  }
}
