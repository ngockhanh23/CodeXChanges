import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServices } from 'src/services/authentication-service';
import { AdminServices } from 'src/services/admin-services';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-withdrawal-details',
  templateUrl: './admin-withdrawal-details.component.html',
  styleUrls: ['./admin-withdrawal-details.component.css']
})
export class AdminWithdrawalDetailsComponent implements OnInit {

  withdrawalItem : any;
  statusWithdrawal = "";
  constructor(private toastr: ToastrService, private authServices: AuthServices, private adminServices: AdminServices, private router: Router, private route: ActivatedRoute){}
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

    this.route.params.subscribe(() => {
      let idWithdrawal = this.route.snapshot.params['id']; 
      this.adminServices.getWithdrawalById(idWithdrawal).subscribe((res) => {
        this.withdrawalItem = res;
        this.statusWithdrawal = this.withdrawalItem.status;
      }, (error) => {
        
      });
    });
  }

  vnPayNavigate(){
    window.open('https://sandbox.vnpayment.vn/merchantv2/Users/Login.htm', '_blank');
  }

  onChangeWithDrawalStatus(){
    const withdrawal = {
      id_WithDrawal : this.withdrawalItem._id,
      status : this.statusWithdrawal
    }

    this.adminServices.changeWithdrawalRequest(withdrawal).subscribe((res) => {
      this.adminServices.getWithdrawalById(this.withdrawalItem._id).subscribe((res) => {
        this.withdrawalItem = res;
        this.statusWithdrawal = this.withdrawalItem.status

        this.toastr.success("Lưu trạng thái thành công")



      }, (error) => {
        
      });
    });

    // console.log(withdrawal)
  }
}
