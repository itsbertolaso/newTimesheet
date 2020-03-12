import { Component, OnInit } from '@angular/core';
import { DomainService } from 'src/core/service/domain.service';

@Component({
  selector: 'app-navstocks',
  templateUrl: './navstocks.component.html',
  styleUrls: ['./navstocks.component.scss']
})
export class NavstocksComponent implements OnInit {

  private company: any[];
  private price: any[];

  constructor(public domainService: DomainService) { }

  ngOnInit() {
    this.domainService.getStock(window.sessionStorage.getItem("token")).subscribe(res => {
      console.log("res.response ", res.response);
      /* res.response.(element => {
        this.company = element["name"];
        this.price = element["price"];
      });
      console.log(this.company, this.price); */
      let temp = Array.from(res.response);
      /* temp.forEach(function(element) {
        console.log("ciao ",element["name"]);
      }); */
      for(var k in res.response) {
        for(var y in res.response.FB) {
          console.log("y", y);
        }
     }
    });
  }

  isLoggedIn() {
    return window.sessionStorage.getItem("token") != null;
  }
}