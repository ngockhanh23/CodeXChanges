
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
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
  form: FormGroup;

  constructor(private authServices: AuthServices, private router: Router, private paymentServices: PaymentServices, private fb: FormBuilder) {
    this.form = this.fb.group({
      amount: [0, Validators.required],
    });
   }

  ngOnInit(): void {
    this.authServices.clearAdminAccountLogged();
    if (this.authServices.userLoginExisting == null) {
      this.router.navigate(['login']);
    }




  }

  createPayment() {
    if (this.form.valid) {

      const transaction = {
        amount: this.form.value.amount * 1000,
        language: "vn",
        bankCode: ""
      };
      // console.log(transaction)


      this.paymentServices.createPayment(transaction).subscribe((response) => {
        const redirectedUrl = response.redirectedUrl;
        window.location.href = redirectedUrl;
      }, (error) => {
        console.error('Lỗi khi gửi yêu cầu POST:', error);
        // Xử lý lỗi nếu cần.
      });


    }
  }
}
