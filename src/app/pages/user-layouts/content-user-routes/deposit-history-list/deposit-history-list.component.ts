import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServices } from 'src/services/authentication-service';

@Component({
  selector: 'app-deposit-history-list',
  templateUrl: './deposit-history-list.component.html',
  styleUrls: ['./deposit-history-list.component.css']
})
export class DepositHistoryListComponent implements OnInit {

  lstDepositHistory : any;
  userLogin: any;
  

  constructor(private authServices : AuthServices, private router : Router){}


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

    this.lstDepositHistory = this.userLogin.deposit_History_List;

  }
}
