import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ApiService {
  private readonly host = "http://localhost:8090";
  constructor(private http: HttpClient) {}

  public get(path: string): Observable<any> {
    console.log(this.host + "/" + path);
    return this.http.get(this.host + "/" + path);
  }
  public post(path: string, bodyObj: any): Observable<any> {
    return this.http.post(this.host + "/" + path, bodyObj);
  }
  public delete(path: string, id: string): Observable<any> {
    return this.http.delete(this.host + "/" + path + "/" + id);
  }
  public replace(path: string, id: string, body: any): Observable<any> {
    console.log("api ser", id);

    return this.http.put(this.host + "/" + path + "/update/" + id, body);
  }
  public filter(path: string, key: string, value: any) {
    if (value) {
      return this.http.get(this.host + "/" + path + "/" + key + "/" + value);
    } else {
      return this.get(path);
    }
  }
}
