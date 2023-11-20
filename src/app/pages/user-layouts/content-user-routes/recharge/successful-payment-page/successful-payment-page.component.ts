import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServices } from 'src/services/authentication-service';
import { PaymentServices } from 'src/services/payment-services';
import { SHA256 } from 'crypto-js';

@Component({
  selector: 'app-successful-payment-page',
  templateUrl: './successful-payment-page.component.html',
  styleUrls: ['./successful-payment-page.component.css']
})
export class SuccessfulPaymentPageComponent implements OnInit {

  userLogin: any;
  amount: Number = 0;
  transactions_Code = "";


  constructor(private paymentServices: PaymentServices, private authServices: AuthServices, private router: Router, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.authServices.clearAdminAccountLogged();
    //check login user
    this.userLogin = this.authServices.userLoginExisting;
    this.authServices.userLoginEmitter.subscribe((user) => {
      this.userLogin = user;
    });

    if (!this.userLogin) {
      this.router.navigate(['/login']);
    };


    const randomReferenceCode = this.generateRandomReferenceCode(16);
    console.log(randomReferenceCode);


    // Lấy query parameters từ URL
    this.route.queryParams.subscribe(params => {
      this.amount = Number(params['amount']) / 1000;
      const transactionCode = params['transaction_code'];

      this.paymentServices.getRechargeByTransactionCode(transactionCode).subscribe((res) => {
        if (res === null) {
          this.paymentServices.getRechargeByReferenceCode(randomReferenceCode).subscribe((res) => {
            if (res === null) {
              const transaction = {
                id_User: this.userLogin._id,
                mode_Of_Payment: 'VnPay',
                transactions_Code: transactionCode,
                reference_Code: randomReferenceCode,
                date_Transactions: new Date(),
                amount_Coins: this.amount,
                status: 'Thành công'
              };

              console.log(transaction)
              this.paymentServices.createRecharge(transaction).subscribe((res) => {
                this.authServices.getUserById(this.userLogin._id).subscribe((res) => {
                  this.authServices.setUserLogged(res);
                })
              });
            }else{
              this.router.navigate(['/']);

            }

          });

        }
        else {
          this.router.navigate(['/']);

        }
      })


      // const transaction = {
      //   id_User : this.userLogin._id,
      //   mode_Of_Payment : 'VnPay',
      //   transactions_Code : transactionCode,
      //   reference_Code : "",
      //   date_Transactions : new Date(),
      //   amount_Coins : this.amount,
      //   status : 'Thành công'
      // };

      // this.paymentServices.createRecharge(transaction).subscribe((res) => {
      //   this.authServices.getUserById(this.userLogin._id).subscribe((res) => {
      //     this.authServices.setUserLogged(res);
      //   })
      // });





    });
  }

  //tạo mã ngẫu nhiên làm mã giao dịch
  generateRandomReferenceCode(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }

    return result;
  }

  // ngAfterViewInit() {
  //   // if(this.userLogin === null|| this.adminLogin === null){
  //     // this.authServices.setUserLogged(this.userLogin);
  //     // this.authServices.setAdminLogged(this.adminLogin);
  //   // }
  //   this.router.navigate(['/']);

  // }
}
