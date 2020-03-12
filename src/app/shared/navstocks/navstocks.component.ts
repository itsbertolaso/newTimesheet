import { Component, OnInit } from '@angular/core';
import { DomainService } from 'src/core/service/domain.service';

@Component({
  selector: 'app-navstocks',
  templateUrl: './navstocks.component.html',
  styleUrls: ['./navstocks.component.scss']
})
export class NavstocksComponent implements OnInit {

  public company: any[];
  public price: any[];

  constructor(public domainService: DomainService) { }

  ngOnInit() {
    this.domainService.getStock(window.sessionStorage.getItem("token")).subscribe(res => {
      console.log("res.response ", res.response);
      for (var k in res.response) {
        //this.company.push(k);
        for (var y in res.response[k]) {
          if (y == "price") {
            console.log(k, res.response[k][y]);
            //this.price.push(res.response[k][y]);
          }
        }
      }
    });
  }

  isLoggedIn() {
    return window.sessionStorage.getItem("token") != null;
  }
}