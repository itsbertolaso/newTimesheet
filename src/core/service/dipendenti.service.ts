import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { Observable } from "rxjs";
@Injectable({
  providedIn: "root"
})
export class DipendentiService {
  constructor(private api: ApiService) {}
  private readonly path = "api/dipendenti";

  public getAll(): Observable<any> {
    return this.api.get(this.path);
  }
  getById(id: string) {
    return this.api.get(this.path + "/id/" + id);
  }
  add(item: any): Observable<any> {
    const obj = {
      name: item.name,
      surname: item.surname,
      taxcode: item.taxCode,
      city: {
        idCity: item.city
      },
      address: item.address,
      gender: item.gender
    };
    return this.api.post(this.path + "/create", obj);
  }
  public deleteById(id: string): Observable<any> {
    return this.api.delete(this.path, id);
  }
  replace(item: any): Observable<any> {
    console.log("dip ser", item);
    return this.api.replace(this.path, item.id, item);
  }
  filter(key: string, value: any) {
    return this.api.filter(this.path, key, value);
  }
}
