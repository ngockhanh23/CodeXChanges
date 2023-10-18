import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServices } from 'src/services/authentication-service';

@Component({
  selector: 'app-admin-home-pages',
  templateUrl: './admin-home-pages.component.html',
  styleUrls: ['./admin-home-pages.component.css']
})
export class AdminHomePagesComponent implements OnInit {
  constructor(private authServices: AuthServices, private router: Router) {

  }
  ngOnInit(): void {

    
    if (this.authServices.adminLoginExisting === null) {
      this.router.navigate(['/']);
    }
  }
  onLogOut() {
    this.authServices.clearUserLogged();
    this.router.navigate(['login']);

  }
}


