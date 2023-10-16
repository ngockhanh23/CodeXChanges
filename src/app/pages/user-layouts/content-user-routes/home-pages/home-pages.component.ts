import { AuthServices } from 'src/services/authentication-service';
import { Component, OnInit } from '@angular/core';
import { UserServices } from 'src/services/users-services';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home-pages',
  templateUrl: './home-pages.component.html',
  styleUrls: ['./home-pages.component.css']
})
export class HomePagesComponent implements OnInit {

  lstCategories: any;

  lstNewCodeProduct: any;

  constructor(private userServices:UserServices, private authServices: AuthServices){}
  ngOnInit(): void {

    this.authServices.clearAdminAccountLogged();

    this.userServices.getLstCategories().subscribe((res) => {
      this.lstCategories = res; 
    });

    this.userServices.getApprovedProductList().subscribe((res) => {
      this.lstNewCodeProduct = res.sort((a:any, b:any) => {
        const dateA = new Date(a.upload_Date);
        const dateB = new Date(b.upload_Date);
        return dateB.getTime() - dateA.getTime();
      }).slice(0, 8);
      
    });
    window.scrollTo(0, 0);

  }
  

}
