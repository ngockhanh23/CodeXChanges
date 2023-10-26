import { AuthServices } from 'src/services/authentication-service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServices } from 'src/services/users-services';
import { AdminServices } from 'src/services/admin-services';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-detail-member-infor',
  templateUrl: './detail-member-infor.component.html',
  styleUrls: ['./detail-member-infor.component.css']
})
export class DetailMemberInforComponent implements OnInit{

  user : any;

  constructor(private authServices: AuthServices, private userServices: UserServices, private route: ActivatedRoute, private router: Router, private adminServices : AdminServices, private toastr: ToastrService) { }


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


       
    this.route.params.subscribe(() => {
      let idUser= this.route.snapshot.params['id'];
        // alert(idCodeProd)
        this.authServices.getUserById(idUser).subscribe((res) => {
           this.user = res;
        });

    });

    
  }
}
