import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServices } from 'src/services/authentication-service';
import { UserServices } from 'src/services/users-services';



@Component({
  selector: 'app-withdrawal-request',
  templateUrl: './withdrawal-request.component.html',
  styleUrls: ['./withdrawal-request.component.css']
})
export class WithdrawalRequestComponent implements OnInit{

  // submitted = false;
  userLogin: any;
  form: FormGroup;
  amountCoins = 0;
  submited = false;
  lstWithDrawalRequest = [];
  uploading: boolean = false;

  @ViewChild('successModal', { static: false }) successModal!: ElementRef;

  constructor(private fb: FormBuilder,private userServices : UserServices,private authServices : AuthServices, private router : Router){
    this.form = this.fb.group({
      bankAccount: ['', Validators.required],
      amountCoins: [0,Validators.required]      
    });
  }
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

    this.lstWithDrawalRequest = this.userLogin.withDrawal_Requests_List;
  }

  submitFormWithdrawal(){
    this.submited = true;
    this.uploading = true;
    const formWithDrawalValue = this.form.value;
    // console.log(formWithDrawalValue)
    if(this.form.valid && formWithDrawalValue.amountCoins >= 200 &&formWithDrawalValue.amountCoins <= this.userLogin.coin_Balance){
      // console.log(formWithDrawalValue)
      this.uploading = true;
      const dataWithDrawal = {
        id_User : this.userLogin._id,
        bank_Account : formWithDrawalValue.bankAccount,
        date_Transaction : new Date(),
        amount_Coins : formWithDrawalValue.amountCoins,
        status : "Đang chờ"
      }
      // console.log(dataWithDrawal)
      this.userServices.createWithdawalRequest(dataWithDrawal).subscribe((res)=> {
        this.uploading = false;
        this.form.reset();
        this.openModal();

        this.authServices.getUserById(this.userLogin._id).subscribe((res) =>{
          this.authServices.setUserLogged(res);
          this.lstWithDrawalRequest = res.withDrawal_Requests_List;

        });

      })
      

    }

  }
  onAmountCoinsChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.form.get('amountCoins')!.setValue(parseFloat(inputElement.value));
  }

  openModal() {
    this.successModal!.nativeElement.style.display = 'block';
  }

  closeModal() {
    this.successModal!.nativeElement.style.display = 'none';
  }
}
