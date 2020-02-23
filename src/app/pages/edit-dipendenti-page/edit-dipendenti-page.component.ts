import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { DipendentiService } from "src/core/service/dipendenti.service";
import { ActivatedRoute, Router } from "@angular/router";
import { DomainService } from "src/core/service/domain.service";
import { ApiService } from "src/core/service/api.service";

@Component({
  selector: "app-edit-dipendenti-page",
  templateUrl: "./edit-dipendenti-page.component.html",
  styleUrls: ["./edit-dipendenti-page.component.scss"]
})
export class EditDipendentiPageComponent implements OnInit {
  public formgroup: FormGroup;
  public soggetto;
  public id;
  public allCountry: any[];
  public regions: any[];
  public cities: any[];
  public province: any[];

  public path = "api/dipendenti/id/";

  constructor(
    public fb: FormBuilder,
    public router: Router,
    public dipendente: DipendentiService,
    public routeActive: ActivatedRoute,
    public country: DomainService,
    public apiService: ApiService
  ) {}

  ngOnInit() {
    // this.id = this.routeActive.snapshot.params.id;
    // this.dipendente.getById(this.id).subscribe(dipendente => {
    //   this.country.getAll().subscribe(res => {
    //     this.allCountry = res;
    //     this.country.getRegionInCountry(dipendente.country).subscribe(res => {
    //       this.regions = res;
    //       this.country.getCitiesInRegion(dipendente.province).subscribe(res => {
    //         this.cities = res;
    //         this.formgroup = this.fb.group({
    //           name: [dipendente.name],
    //           surname: [dipendente.surname],
    //           taxCode: [dipendente.taxCode],
    //           country: [dipendente.country],
    //           city: [dipendente.city],
    //           province: [dipendente.province],
    //           phoneNumber: [dipendente.phoneNumber],
    //           address: [dipendente.address],
    //           gender: [dipendente.gender],
    //           email: [dipendente.email]
    //         });
    //       });
    //     });
    //   });
    // });

    this.id = this.routeActive.snapshot.params.id;
    this.country.getAll().subscribe(res => {
      this.allCountry = res.response;
      this.apiService.get(this.path + this.id).subscribe(res => {
        res = res.response;
        this.country.getProvince(res.citta.idProv).subscribe(prov => {
          this.country.getRegion(prov.response.idRegione).subscribe(region => {
            this.country.getByIso(region.response.isoCountry).subscribe(cou => {
              this.country
                .getRegionInCountry(cou.response.idNazione)
                .subscribe(resp => {
                  this.regions = resp.response;
                  this.country
                    .getProvinceInRegion(region.response.idRegion)
                    .subscribe(resp => {
                      this.province = resp.response;
                      this.country
                        .getCitiesInProvince(prov.response.idProvincia)
                        .subscribe(resp => {
                          this.cities = resp.response;
                          this.formgroup = this.fb.group({
                            name: [res.name],
                            surname: [res.surname],
                            taxCode: [res.taxcode],
                            city: [res.citta.idCity],
                            province: [prov.response.idProvincia],
                            region: [region.response.idRegion],
                            country: [cou.response.idNazione]
                          });
                        });
                    });
                });
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
      this.regions = res.response;
      this.formgroup = this.fb.group({
        name: [this.formgroup.value.name],
        surname: [this.formgroup.value.surname],
        taxCode: [this.formgroup.value.taxCode],
        country: [this.formgroup.value.country],
        city: [this.formgroup.value.city],
        region: [this.regions[0].idRegion],
        province: [this.formgroup.value.province]
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
        region: [this.formgroup.value.region]
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
        region: [this.formgroup.value.region]
      });
    });
  }
}
