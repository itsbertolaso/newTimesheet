import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { DipendentiService } from "src/core/service/dipendenti.service";
import { DomainService } from "src/core/service/domain.service";
import { ApiService } from "src/core/service/api.service";

@Component({
  selector: "app-dettaglio-dipendenti-page",
  templateUrl: "./dettaglio-dipendenti-page.component.html",
  styleUrls: ["./dettaglio-dipendenti-page.component.scss"]
})
export class DettaglioDipendentiPageComponent implements OnInit {
  soggetto;

  public path = "api/dipendenti/id/";

  constructor(
    public routeActive: ActivatedRoute,
    public dipendente: DipendentiService,
    public country: DomainService,
    public apiService: ApiService
  ) {}

  ngOnInit() {
    const id = this.routeActive.snapshot.params.id;
    this.apiService.get(this.path + id).subscribe(res => {
      res = res.response;
      this.country.getProvince(res.citta.idProv).subscribe(prov => {
        this.country.getRegion(prov.response.idRegione).subscribe(region => {
          this.country.getByIso(region.response.isoCountry).subscribe(cou => {
            this.soggetto = {
              name: res.name,
              surname: res.surname,
              taxcode: res.taxcode,
              city: res.citta.name,
              province: prov.response.description,
              region: region.response.name,
              country: cou.response.name
            };
          });
        });
      });
    });
  }
}
