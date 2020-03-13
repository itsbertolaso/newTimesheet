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
    stockList["token"] = token;
    return this.api.post("/update", stockList);
  }
}
