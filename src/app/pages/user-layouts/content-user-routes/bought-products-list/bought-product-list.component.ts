import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServices } from 'src/services/authentication-service';

@Component({
  selector: 'app-bought-product-list',
  templateUrl: './bought-product-list.component.html',
  styleUrls: ['./bought-product-list.component.css']
})
export class BoughtProductListComponent implements OnInit{
  
  lstBoughtProducts : any;
  userLogin: any;

  constructor(private authServices : AuthServices, private router : Router){}

  ngOnInit(): void {
    this.authServices.clearAdminAccountLogged();
    //check login user
    this.userLogin = this.authServices.userLoginExisting;
    this.authServices.userLoginEmitter.subscribe((user) => {
      this.userLogin = user;
    });

    if(!this.userLogin){
      this.router.navigate(['/login']);
    };

    this.lstBoughtProducts = this.userLogin.purchase_History
  }
}
