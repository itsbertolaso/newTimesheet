import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private api: ApiService) { }

  private readonly stock = "api/stock";

  getStock(token: string) {
    return this.api.get(this.stock + "/get/" + token);
  }
}
