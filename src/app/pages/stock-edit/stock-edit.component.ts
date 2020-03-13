import { Component, OnInit } from '@angular/core';
import { StockService } from 'src/core/service/stock.service';

@Component({
  selector: 'app-stock-edit',
  templateUrl: './stock-edit.component.html',
  styleUrls: ['./stock-edit.component.scss']
})
export class StockEditComponent implements OnInit {

  constructor(public stockService: StockService) { }

  private stockList: Array<any> = [];

  ngOnInit() {
    this.stockService.getStock(window.sessionStorage.getItem("token")).subscribe(res => {
      console.log("Calling stock api...");
      for (let k in res.response) {
        this.stockList.push(res.response[k]);
      }
    });
    this.invia();
    console.log("Ciao sono dentro allo stock edi.. ecco le stock attuali: ", this.stockList);
  }

  invia() {
    this.stockService.addStock(window.sessionStorage.getItem("token"), this.stockList).subscribe(res => {
      console.log(res);
    });
  }

}
