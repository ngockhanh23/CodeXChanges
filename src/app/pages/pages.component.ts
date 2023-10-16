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

  constructor(private authServices: AuthServices,private router: Router) { }
  ngOnInit(): void {
    this.authServices.adminLoginEmitter.subscribe((account) =>
    this.adminLogin = account
  );
    const loginExists = localStorage.getItem('account_id');


    if (loginExists) {
      this.authServices.checkRoleAccount(loginExists).subscribe((res) => {
        if (res.role == "user") {
          this.authServices.getUserById(loginExists).subscribe((res) => {
            this.authServices.setUserLogged(res)
          })
        }
        else if(res.role == "admin"){
          this.authServices.getAdminAccountById(loginExists).subscribe((res) => {
            this.authServices.setAdminLogged(res);
            // console.log(this.authServices.adminLoginExisting)
            this.router.navigate(['/admin-home']);

          })
        }

      



      });
    }
  }
}
