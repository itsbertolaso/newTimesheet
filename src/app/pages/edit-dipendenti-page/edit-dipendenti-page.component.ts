import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { DipendentiService } from "src/core/service/dipendenti.service";
import { ActivatedRoute, Router } from "@angular/router";
import { DomainService } from "src/core/service/domain.service";
import { ApiService } from 'src/core/service/api.service';

@Component({
  selector: "app-edit-dipendenti-page",
  templateUrl: "./edit-dipendenti-page.component.html",
  styleUrls: ["./edit-dipendenti-page.component.scss"]
})
export class EditDipendentiPageComponent implements OnInit {
  public formgroup: FormGroup;
  public soggetto;
  public id;
  public allCountry: any[]; //
  public regions: any[];
  public cities: any[];

  constructor(
    public fb: FormBuilder,
    public router: Router,
    public dipendente: DipendentiService,
    public routeActive: ActivatedRoute,
    public country: DomainService,
    public api: ApiService
  ) {}

  ngOnInit() {
    this.id = this.routeActive.snapshot.params.id;
    this.dipendente.getById(this.id).subscribe(dipendente => {
      this.country.getAll().subscribe(res => {
        this.allCountry = res;
        this.country.getRegionInCountry(dipendente.country).subscribe(res => {
          this.regions = res;
          this.country.getCitiesInRegion(dipendente.province).subscribe(res => {
            this.cities = res;
            this.formgroup = this.fb.group({
              name: [dipendente.name],
              surname: [dipendente.surname],
              taxCode: [dipendente.taxCode],
              country: [dipendente.country],
              city: [dipendente.city],
              province: [dipendente.province],
              phoneNumber: [dipendente.phoneNumber],
              address: [dipendente.address],
              gender: [dipendente.gender],
              email: [dipendente.email]
            });
          });
        });
      });
    });
  }
  conferma() {
    this.dipendente
      .replace({ id: this.id, ...this.formgroup.value })
      .subscribe(res => {
        this.router.navigate(["dipendenti"]);
      });
  }

  updateRegion(event: any) {
    this.country.getRegionInCountry(event.target.value).subscribe(res => {
      this.regions = res;
      this.formgroup = this.fb.group({
        name: [this.formgroup.value.name],
        surname: [this.formgroup.value.surname],
        taxCode: [this.formgroup.value.taxCode],
        country: [this.formgroup.value.country],
        city: [this.formgroup.value.city],
        province: [this.regions[0].description],
        phoneNumber: [this.formgroup.value.phoneNumber],
        address: [this.formgroup.value.address],
        gender: [this.formgroup.value.gender],
        email: [this.formgroup.value.email]
      });
      this.updateCity({
        target: {
          value: this.formgroup.value.province
        }
      });
    });
  }
  updateCity(event: any) {
    this.country.getCitiesInRegion(event.target.value).subscribe(res => {
      console.log(res);
      this.cities = res;
      this.formgroup = this.fb.group({
        name: [this.formgroup.value.name],
        surname: [this.formgroup.value.surname],
        taxCode: [this.formgroup.value.taxCode],
        country: [this.formgroup.value.country],
        city: [this.cities[0].description],
        province: [this.formgroup.value.province],
        phoneNumber: [this.formgroup.value.phoneNumber],
        address: [this.formgroup.value.address],
        gender: [this.formgroup.value.gender],
        email: [this.formgroup.value.email]
      });
    });
  }
}
