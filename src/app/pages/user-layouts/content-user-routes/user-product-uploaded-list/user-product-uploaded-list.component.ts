import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServices } from 'src/services/authentication-service';

@Component({
  selector: 'app-user-product-uploaded-list',
  templateUrl: './user-product-uploaded-list.component.html',
  styleUrls: ['./user-product-uploaded-list.component.css']
})
export class UserProductUploadedListComponent implements OnInit{
  userLogin: any;
  lstProductUploaded : any;
  constructor(private authServices : AuthServices, private router : Router){}
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

    this.lstProductUploaded = this.userLogin.code_Products;


    
  }
}
