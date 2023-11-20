import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminServices } from 'src/services/admin-services';
import { AuthServices } from 'src/services/authentication-service';

@Component({
  selector: 'app-admin-revenue-statistics',
  templateUrl: './admin-revenue-statistics.component.html',
  styleUrls: ['./admin-revenue-statistics.component.css']
})
export class AdminRevenueStatisticsComponent implements OnInit {
  selectedTab: number = 1;

  lstTransactionMember : any;
  lstAllTransactionMember = [];

  totalPrice = 0;
  totalNetRevenue = 0;


  dateStart: string = '';
  dateEnd: string = '';


  constructor(private router: Router,private adminServices : AdminServices,private authServices: AuthServices,){}

  ngOnInit(): void {
    //check role user login
    const loginExists = localStorage.getItem('account_id');    
    if (loginExists === null) {
      this.router.navigate(['/']);
    }
    this.authServices.checkRoleAccount(loginExists!).subscribe((res) => {
      if (res.role === "user") {
        this.router.navigate(['/']);
      }      
    });

    this.adminServices.getAllTransactions().subscribe((res) => {
      this.lstTransactionMember = res;
      this.lstAllTransactionMember = this.lstTransactionMember;
      this.totalPrice = this.calculateTotalPrice(this.lstTransactionMember);
      this.totalNetRevenue = this.calculateTotalNetRevenue(this.lstTransactionMember);
    })

  }


  selectTab(tabNumber: number) {
    this.selectedTab = tabNumber;
  }

  filterByDate() {

    // Chuyển đổi dateStart và dateEnd sang đối tượng Date
    const startDate = new Date(this.dateStart);
    const endDate = new Date(this.dateEnd);

    if (!this.dateStart || !this.dateEnd || startDate > endDate) {
      
      return;
    }
    console.log(startDate, endDate)

    this.lstTransactionMember = this.lstAllTransactionMember.filter((transaction : any) => {
      const trading_Date = new Date(transaction.trading_Date);
      return trading_Date >= startDate && trading_Date <= endDate;
    });
    this.totalPrice = this.calculateTotalPrice(this.lstTransactionMember);
      this.totalNetRevenue = this.calculateTotalNetRevenue(this.lstTransactionMember);
  }

  filterByCurrentDate() {
    let currentDate = new Date();
    this.lstTransactionMember = this.lstAllTransactionMember.filter((transaction : any) => {
      const trading_Date = new Date(transaction.trading_Date);
      return trading_Date === currentDate;
    });
    this.totalPrice = this.calculateTotalPrice(this.lstTransactionMember);
      this.totalNetRevenue = this.calculateTotalNetRevenue(this.lstTransactionMember);
  }

  getAllTransactions(){
    this.lstTransactionMember = this.lstAllTransactionMember;
    this.totalPrice = this.calculateTotalPrice(this.lstTransactionMember);
      this.totalNetRevenue = this.calculateTotalNetRevenue(this.lstTransactionMember);
  }


  calculateTotalPrice(transactions : any) {
    let totalPrice = 0;
    for (let i = 0; i < transactions.length; i++) {
      totalPrice += transactions[i].price;
    }
    return totalPrice;
  }
  calculateTotalNetRevenue(transactions : any) {
    let totalNetRevenue = 0;
    for (let i = 0; i < transactions.length; i++) {
      totalNetRevenue += transactions[i].net_Revenue;
    }
    return totalNetRevenue;
  }


}


