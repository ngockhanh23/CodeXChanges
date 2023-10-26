import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminServices } from 'src/services/admin-services';
import { AuthServices } from 'src/services/authentication-service';

@Component({
  selector: 'app-admin-home-pages',
  templateUrl: './admin-home-pages.component.html',
  styleUrls: ['./admin-home-pages.component.css']
})
export class AdminHomePagesComponent implements OnInit {

  lstCodeProdUploaded :any;
  countAllCodeProds = 0;

  constructor(private authServices: AuthServices, private router: Router, private adminServices : AdminServices) {}
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

    

    this.adminServices.getAllCodeProducts().subscribe((res) => {
      this.lstCodeProdUploaded = res;
      this.countAllCodeProds = this.lstCodeProdUploaded.length;
    });
  }


  getAllCodeProd(){
    this.adminServices.getAllCodeProducts().subscribe((res) => {
      this.lstCodeProdUploaded = res;
    });
  }

  fillApprovedProd(){
    this.adminServices.getAllCodeProducts().subscribe((res) => {
      this.lstCodeProdUploaded = res.filter((item:any) => item.status === "Đã duyệt");
    });
  }

  fillAwaitingApprovalProd(){
    this.adminServices.getAllCodeProducts().subscribe((res) => {
      this.lstCodeProdUploaded = res.filter((item:any) => item.status === "Chờ duyệt");
    });
  }
  fillRefusedProd(){
    this.adminServices.getAllCodeProducts().subscribe((res) => {
      this.lstCodeProdUploaded = res.filter((item:any) => item.status === "Đã từ chối");
    });
  }

  onLogOut() {
    this.authServices.clearUserLogged();
    this.router.navigate(['login']);

  }
}


