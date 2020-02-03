import { Component, OnInit } from "@angular/core";
import { DataTableOptions } from "src/app/api/datatable-options";
import { DipendentiService } from "src/core/service/dipendenti.service";
import { Router } from "@angular/router";
import { ApiService } from "src/core/service/api.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-dipendenti-page",
  templateUrl: "./dipendenti-page.component.html",
  styleUrls: ["./dipendenti-page.component.scss"]
})
export class DipendentiPageComponent implements OnInit {

  public path = "api/dipendenti/delete";

  options: DataTableOptions = {
    colsOptions: [
      {
        label: "ID",
        name: "idDipendente"
      },
      {
        label: "Name",
        name: "name"
      },
      {
        label: "Surname",
        name: "surname"
      },
      {
        label: "Tax Code",
        name: "taxcode"
      }
    ]
  };
  public lista: any[];
  public keys = [
    {
      label: "Name",
      name: "name"
    },
    {
      label: "Surname",
      name: "surname"
    },
    {
      label: "Tax Code",
      name: "taxcode"
    }
  ];
  constructor(
    public routeActive: ActivatedRoute,
    public dipendenteService: DipendentiService,
    public router: Router,
    public api: ApiService
  ) {}

  ngOnInit() {
    this.dipendenteService.getAll().subscribe(res => {
      this.lista = res;
    });
  }

  select(input: any[]) {
    const sogg = input[0];
    this.router.navigate(["dipendenti", sogg.idDipendente]);
  }
  onDeleteHandler(id: any) {
    this.api.delete(this.path, id).subscribe(r => {
      this.api.get("api/dipendenti/").subscribe(res => {
        this.lista = res;
      });
    });
    /* this.dipendenteService.deleteById(id).subscribe(r => {
      this.dipendenteService.getAll().subscribe(res => {
        this.lista = res;
      });
    }); */
  }
  onEditHandler(id: any) {
    console.log(id);
    this.router.navigate(["dipendenti/update", id]);
  }
  filter(res: any) {
    console.log(res);
    this.dipendenteService
      .filter(res.key, res.filter)
      .subscribe((res: any[]) => {
        this.lista = res;
      });
  }
}
