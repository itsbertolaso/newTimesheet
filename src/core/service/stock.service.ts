import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private api: ApiService) { }

  private readonly stock = "api/stock";

  getStock(token: string) {
    return this.api.get(this.stock + "/get/" + token);
  }

  addStock(token: string, stockList: Array<any>): Observable<any> {
    /* let temp = {
      "token": token
    };

    stockList["token"] = temp; */
    console.log("Sono dentro a addStock, questa è la lista: ", stockList);

    return this.api.post(this.stock + "/update", stockList[token]);
  }
}
