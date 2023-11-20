import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminServices } from 'src/services/admin-services';
import { AuthServices } from 'src/services/authentication-service';

@Component({
  selector: 'app-admin-deposit-list',
  templateUrl: './admin-deposit-list.component.html',
  styleUrls: ['./admin-deposit-list.component.css']
})
export class AdminDepositListComponent implements OnInit {
  adminLogged : any;
  lstDeposits : any;
  lstAllDeposits  = [];

  dateStart: string = '';
  dateEnd: string = '';

  constructor(private router: Router,private adminServices : AdminServices,private authServices: AuthServices,){}
  ngOnInit(): void {
    // check role user login
    const loginExists = localStorage.getItem('account_id');    
    if (loginExists === null) {
      this.router.navigate(['/']);
    }
    this.authServices.checkRoleAccount(loginExists!).subscribe((res) => {
      if (res.role === "user") {
        this.router.navigate(['/']);
      }      
    });

    this.adminServices.getAllRechargeList().subscribe((res) => {
      this.lstDeposits = res;
      this.lstAllDeposits = this.lstDeposits;
    },(error) => {console.log(error.message)});    
  }

  filterByDate() {

    // Chuyển đổi dateStart và dateEnd sang đối tượng Date
    const startDate = new Date(this.dateStart);
    const endDate = new Date(this.dateEnd);

    if (!this.dateStart || !this.dateEnd || startDate > endDate) {
      // Xử lý khi người dùng không nhập hoặc nhập sai ngày
      // ở đây có thể thông báo lỗi hoặc hiển thị danh sách ban đầu
      return;
    }

    this.lstDeposits = this.lstDeposits.filter((deposit : any) => {
      const transactionDate = new Date(deposit.date_Transactions);
      return transactionDate >= startDate && transactionDate <= endDate;
    });
  }

  filterByCurrentDate() {
    let currentDate = new Date();
    this.lstDeposits = this.lstAllDeposits.filter((deposit : any) => {
      const transactionDate = new Date(deposit.date_Transactions);
      return transactionDate === currentDate;
    });
  }

  getAllDeposits(){
    this.lstDeposits = this.lstAllDeposits;
  }
 

}
