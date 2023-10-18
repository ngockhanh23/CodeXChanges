import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServices } from 'src/services/authentication-service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit{
  constructor(private authServices: AuthServices, private router: Router) {

  }
  ngOnInit(): void {
    if (this.authServices.adminLoginExisting == null) {
      this.router.navigate(['']);
    }
  }
  onLogOut() {
    this.authServices.clearAdminAccountLogged();
    this.router.navigate(['login']);

  }
}
