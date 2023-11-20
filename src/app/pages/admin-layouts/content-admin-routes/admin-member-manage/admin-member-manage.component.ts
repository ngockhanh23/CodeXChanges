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

  lstUsers : any;
  lstUsersFill : any;
  searchTerm: string = '';
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
      this.lstUsers = res;
      this.lstUsersFill = this.lstUsers
    }, (error) => {console.log(error.message)})
  }

  onInputChange(event: any) {
    if (event && event.target) {
      // this.searchTerm = event.target.value;
          this.lstUsersFill = this.lstUsers.filter((user : any )=> user?.name.toLowerCase().includes(event.target.value.toLowerCase()));

    }
    
  }
}
