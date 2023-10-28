import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServices } from 'src/services/authentication-service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  adminLogin: any;
  userLogin:any;

  constructor(private authServices: AuthServices, private router: Router) { 
    // this.adminLogin = null;
    // this.userLogin = null;
  }
  ngOnInit(): void {
    this.authServices.adminLoginEmitter.subscribe((account) =>
      this.adminLogin = account
    );
    this.authServices.userLoginEmitter.subscribe((account) =>
      this.userLogin = account
    );
    const loginExists = localStorage.getItem('account_id');
    console.log("user login : " + loginExists)

    if (loginExists) {
      this.authServices.checkRoleAccount(loginExists).subscribe((res) => {
        if (res.role === "user") {
          this.authServices.getUserById(loginExists).subscribe((res) => {
            this.authServices.setUserLogged(res);
          });
        }
        else if (res.role === "admin") {
          this.authServices.getAdminAccountById(loginExists).subscribe((res) => {
            this.authServices.setAdminLogged(res);
            // console.log(this.authServices.adminLoginExisting)
            this.router.navigate(['/admin-home']);

          })
        }
      });
      // return
    }
    // else
    
    // this.authServices.clearUserLogged()
  }

  ngAfterViewInit() {
    // if(this.userLogin === null|| this.adminLogin === null){
      this.authServices.setUserLogged(this.userLogin);
      this.authServices.setAdminLogged(this.adminLogin);
    // }
  }
}
