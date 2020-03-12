import { Component, OnInit } from '@angular/core';
import { DomainService } from 'src/core/service/domain.service';

@Component({
  selector: 'app-navstocks',
  templateUrl: './navstocks.component.html',
  styleUrls: ['./navstocks.component.scss']
})
export class NavstocksComponent implements OnInit {

  public generic: Array<any> = [];

  constructor(public domainService: DomainService) { }

  ngOnInit() {
    this.stockCall(this.domainService, this.generic);
    setInterval(this.stockCall, 6000, this.domainService, this.generic);
  }

  stockCall(domainService, generic) {
    this.generic = [];
    domainService.getStock(window.sessionStorage.getItem("token")).subscribe(res => {
      console.log("Calling stock api...");
      for (let k in res.response) {
        this.generic.push(res.response[k]);
      }
    });
  }

  isLoggedIn() {
    return window.sessionStorage.getItem("token") != null;
  }
}