import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServices } from 'src/services/authentication-service';

@Component({
  selector: 'app-revenue-statistics',
  templateUrl: './revenue-statistics.component.html',
  styleUrls: ['./revenue-statistics.component.css']
})
export class RevenueStatisticsComponent implements OnInit{
  constructor(private authServices : AuthServices, private router : Router){}

  lstRevenue : any;
  userLogin: any;

  totalNetRevenues = 0;
  totalPrice = 0;
  commission = 0;

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

    this.lstRevenue = this.userLogin.revenues;
    this.totalPrice = this.calculateTotalPrice();
    this.totalNetRevenues = this.calculateTotalNetRevenue();
    this.commission = this.calculateTotalcommission();
  }

  onSubmitStatistic(form: NgForm){
    // console.log(form.value)
    const dateStart = form.value.dateStart;
    const dateEnd = form.value.dateEnd;
    if(!dateStart && !dateEnd){
      this.lstRevenue = this.userLogin.revenues;
      return;
    }
    this.lstRevenue = this.userLogin.revenues;

    this.lstRevenue = this.userLogin.revenues.filter((revenue : any) => {
      // const tradingDate = new Date(revenue.trading_Date);
      
      return revenue.trading_Date >= dateStart && revenue.trading_Date <= dateEnd;
    });
    this.totalPrice = this.calculateTotalPrice();
      this.totalNetRevenues = this.calculateTotalNetRevenue();
      this.commission = this.calculateTotalcommission();
  }

  calculateTotalNetRevenue() {
    return this.lstRevenue.reduce((total : any, item : any) => total + item.net_Revenue, 0);
  }

  calculateTotalPrice() {
    return this.lstRevenue.reduce((total:any, item:any) => total + item.price, 0);
  }
  calculateTotalcommission() {
    return this.lstRevenue.reduce((total:any, item:any) => total + (item.price - item.net_Revenue), 0);
  }

  
  
}
