import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class DomainService {
  constructor(private api: ApiService) { }
  private readonly countries = "api/nazioni";
  private readonly region = "api/regioni";
  private readonly cities = "api/citta";
  private readonly province = "api/province";


  public getAll(): Observable<any> {
    return this.api.get(this.countries);
  }

  getCity(id: string) {
    return this.api.get(this.cities + "/id/" + id);
  }

  getCountry(id: string) {
    return this.api.get(this.countries + "/id/" + id);
  }

  getRegion(id: string) {
    return this.api.get(this.region + "/id/" + id);
  }

  getProvince(id: string) {
    return this.api.get(this.province + "/id/" + id);
  }

  getByIso(iso: string) {
    return this.api.get(this.countries + "/id/" + iso);
  }

  getRegionInCountry(iso) {
    return this.api.get(this.region + "/nazione/" + iso);
  }

  getProvinceInRegion(region) {
    return this.api.get(this.province + "/regione/" + region);
  }

  getCitiesInProvince(province) {
    return this.api.get(this.cities + "/idProv/" + province);
  }
}