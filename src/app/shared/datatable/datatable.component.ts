import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { DataTableOptions } from "src/app/api/datatable-options";

@Component({
  selector: "app-datatable",
  templateUrl: "./datatable.component.html",
  styleUrls: ["./datatable.component.scss"]
})
export class DatatableComponent implements OnInit {
  @Input() lista: any[];
  @Input() public options: DataTableOptions;
  @Input() public selectiontype: string;
  @Input() delete: boolean;
  @Input() edit: boolean;
  
  @Output() selectRows: EventEmitter<any> = new EventEmitter<any>();
  @Output() onEditEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() onDeleteEvent: EventEmitter<any> = new EventEmitter<any>();

  selected: boolean[] = [];

  currentIndex: number;

  select(index: number) {
    if (this.selectiontype === "multiple" || this.selectiontype === "single") {
      if (this.selectiontype === "single") {
        let b = this.selected[index];
        this.selected = [];
        this.selected[index] = b;
      }
      this.selected[index] = !this.selected[index];
      const listaSelect = [];
      this.selected.forEach((item, i) => {
        if (item) {
          listaSelect.push(this.lista[i]);
        }
      });
      this.selectRows.emit(listaSelect);
    }
  }

  constructor() {}

  ngOnInit() {
    console.log(this.lista);
  }

  onDelete(item) {
    this.onDeleteEvent.emit(item.idDipendente);
  }
  onEdit(item) {
    this.onEditEvent.emit(item.idDipendente);
  }
}
