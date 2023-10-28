
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServices } from 'src/services/authentication-service';
import { PaymentServices } from 'src/services/payment-services';

@Component({
  selector: 'app-recharge',
  templateUrl: './recharge.component.html',
  styleUrls: ['./recharge.component.css']
})
export class RechargeComponent implements OnInit {

  accountUser: any;

  constructor(private authServices: AuthServices, private router: Router,private paymentServices: PaymentServices) { }

  ngOnInit(): void {
    this.authServices.clearAdminAccountLogged();
    if (this.authServices.userLoginExisting == null) {
      this.router.navigate(['login']);
    }

    

    
  }

  createPayment(){
    const transaction = {
      amount: 300000,
      language: "vn",
      bankCode: ""
    };
    // console.log(transaction)


    this.paymentServices.createPayment(transaction).subscribe((response) => {
      const redirectUrl = response.redirectUrl;

        // Chuyển người dùng đến trang thanh toán
        window.location.href = redirectUrl;
    });


  }
}
