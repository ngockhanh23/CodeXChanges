import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServices } from 'src/services/authentication-service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  adminLogged: any;
  countUnreadNoti = 0;


  constructor(private authServices: AuthServices, private router: Router) {

  }
  ngOnInit(): void {
    // check role user login
    const loginExists = localStorage.getItem('account_id');
    if (loginExists === null) {
      this.router.navigate(['/']);
    }
    this.authServices.checkRoleAccount(loginExists!).subscribe((res) => {
      if (res.role === "user") {
        this.router.navigate(['/']);
      }
    });

    this.adminLogged = this.authServices.adminLoginExisting; 
    this.authServices.adminLoginEmitter.subscribe((adminAccount) => {
      this.adminLogged = adminAccount;
      this.countUnreadNoti = this.countUnreadNotifications();

    });
    this.countUnreadNoti = this.countUnreadNotifications();

  }
  onLogOut() {
    this.authServices.clearAdminAccountLogged();
    this.router.navigate(['login']);
  }

  countUnreadNotifications(): number {
    const unreadNotifications = this.adminLogged.notifications.filter((notification: any) => !notification.status_Notification);
    return unreadNotifications.length;
  }
}
