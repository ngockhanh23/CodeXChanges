import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminServices } from 'src/services/admin-services';
import { AuthServices } from 'src/services/authentication-service';

@Component({
  selector: 'app-admin-member-manage',
  templateUrl: './admin-member-manage.component.html',
  styleUrls: ['./admin-member-manage.component.css']
})
export class AdminMemberManageComponent implements OnInit{

  lstUser : any;
  constructor(private router: Router,private adminServices : AdminServices,private authServices: AuthServices,){}
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

    
    this.adminServices.getListUsers().subscribe((res) => {
      this.lstUser = res;
    }, (error) => {console.log(error.message)})
  }
}
