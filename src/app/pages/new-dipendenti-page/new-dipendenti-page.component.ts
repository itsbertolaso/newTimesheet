import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { DipendentiService } from "src/core/service/dipendenti.service";
import { Router } from "@angular/router";
import { DomainService } from "src/core/service/domain.service";

@Component({
  selector: "app-new-dipendenti-page",
  templateUrl: "./new-dipendenti-page.component.html",
  styleUrls: ["./new-dipendenti-page.component.scss"]
})
export class NewDipendentiPageComponent implements OnInit {
  public formgroup: FormGroup;
  public allCountry: any[];
  public regions: any[];
  public province: any[];
  public cities: any[];

  constructor(
    public fb: FormBuilder,
    public router: Router,
    public dipendente: DipendentiService,
    public country: DomainService
  ) {}

  ngOnInit() {
    this.country.getAll().subscribe(res => {
      this.allCountry = res.response;
      this.country
        .getRegionInCountry(this.allCountry[0].idNazione)
        .subscribe(res => {
          this.regions = res.response;
          this.country
            .getProvinceInRegion(this.regions[0].idRegion)
            .subscribe(res => {
              this.province = res.response;
              this.country
                .getCitiesInProvince(this.province[0].idProvincia)
                .subscribe(res => {
                  this.cities = res.response;

                  this.formgroup = this.fb.group({
                    name: [""],
                    surname: [""],
                    taxCode: [""],
                    country: [this.allCountry[0].idNazione],
                    city: [this.cities[0].idCity],
                    region: [this.regions[0].idRegion],
                    province: [this.province[0].idProvincia],
                    address: [""],
                    gender: [""],
                    email: [""]
                  });
                });
            });
        });
    });
  }
  conferma() {
    this.dipendente.add(this.formgroup.value).subscribe(res => {
      this.router.navigate(["dipendenti"]);
    });
  }
  updateRegion(event: any) {
    this.country.getRegionInCountry(event.target.value).subscribe(res => {
      this.regions = res.response;
      this.formgroup = this.fb.group({
        name: [this.formgroup.value.name],
        surname: [this.formgroup.value.surname],
        taxCode: [this.formgroup.value.taxCode],
        country: [this.formgroup.value.country],
        city: [this.formgroup.value.city],
        region: [this.regions[0].idRegion],
        province: [this.formgroup.value.province],
        address: [this.formgroup.value.address],
        gender: [this.formgroup.value.gender],
        email: [this.formgroup.value.email]
      });
      this.updateProvince({
        target: {
          value: this.formgroup.value.region
        }
      });
    });
  }
  updateProvince(event: any) {
    this.country.getProvinceInRegion(event.target.value).subscribe(res => {
      this.province = res.response;

      this.formgroup = this.fb.group({
        name: [this.formgroup.value.name],
        surname: [this.formgroup.value.surname],
        taxCode: [this.formgroup.value.taxCode],
        country: [this.formgroup.value.country],
        city: [this.formgroup.value.city],
        province: [this.province[0].idProvincia],
        region: [this.formgroup.value.region],
        address: [this.formgroup.value.address],
        gender: [this.formgroup.value.gender],
        email: [this.formgroup.value.email]
      });
      console.log(this.formgroup.value.province);
      this.updateCity({
        target: {
          value: this.formgroup.value.province
        }
      });
    });
  }
  updateCity(event: any) {
    this.country.getCitiesInProvince(event.target.value).subscribe(res => {
      this.cities = res.response;
      console.log("Citta ", res);

      this.formgroup = this.fb.group({
        name: [this.formgroup.value.name],
        surname: [this.formgroup.value.surname],
        taxCode: [this.formgroup.value.taxCode],
        country: [this.formgroup.value.country],
        city: [this.cities[0].idCity],
        province: [this.formgroup.value.province],
        region: [this.formgroup.value.region],
        address: [this.formgroup.value.address],
        gender: [this.formgroup.value.gender],
        email: [this.formgroup.value.email]
      });
    });
  }
}
