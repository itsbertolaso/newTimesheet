import { Component, OnInit } from '@angular/core';
import { StockService } from 'src/core/service/stock.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stock-edit',
  templateUrl: './stock-edit.component.html',
  styleUrls: ['./stock-edit.component.scss']
})
export class StockEditComponent implements OnInit {

  private stockList: Array<any> = [];
  private selectedStocks: any[];
  private stocks: any[];

  constructor(public stockService: StockService, public router: Router) {
    this.stocks = [
      { name: 'Apple', symbol: 'AAPL' },
      { name: 'Facebook', symbol: 'FB' },
      { name: 'Microsoft', symbol: 'MSFT' },
      { name: 'Nvidia', symbol: 'NVDA' },
      { name: 'Google', symbol: 'GOOG' }
    ];
  }

  ngOnInit() {
    this.stockService.getStock(window.sessionStorage.getItem("token")).subscribe(res => {
      console.log("Calling stock api...");
      for (let k in res.response) {
        this.stockList.push(res.response[k]["symbol"]);
      }
    });

    this.selectedStocks = this.stockList;
    console.log("Array: ", this.stockList);

    let temp = {
      "token": window.sessionStorage.getItem("token"),
      "value": this.stockList
    }

    console.log("Temp: ", temp);

    //this.invia(temp);
    console.log("Ciao sono dentro allo stock edi.. ecco le stock attuali: ", this.stockList);
  }

  invia(temp) {
    this.stockService.addStock(temp).subscribe(res => {
      console.log("Res: ", res);
    });
  }

  toggle(symbol: any) {
    var found = this.stockList.find(function (element) {
      return element == symbol;
    });
    return found;
  }

  check(event: any, symbol: any) {
    if (event.srcElement.checked) {
      this.stockList.push(symbol);
      console.log(this.stockList);
    } else {
      let i = this.stockList.indexOf(symbol);
      this.stockList.splice(i, 1);
      console.log(this.stockList);
    }
  }

  update() {
    let temp = {
      "token": window.sessionStorage.getItem("token"),
      "value": this.stockList
    }
    this.invia(temp);
    this.router.navigate(["dipendenti"]);
  }

  idk() {
    /* for(let i in this.stockList) {
      for(let j in this.stocks) {
        if(j == i) {
          return true;
        }
      }
    }
    return false; */
    return true;
  }

}
