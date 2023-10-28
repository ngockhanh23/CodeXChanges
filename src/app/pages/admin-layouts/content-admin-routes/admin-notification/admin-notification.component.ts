import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminServices } from 'src/services/admin-services';
import { AuthServices } from 'src/services/authentication-service';

@Component({
  selector: 'app-admin-notification',
  templateUrl: './admin-notification.component.html',
  styleUrls: ['./admin-notification.component.css']
})
export class AdminNotificationComponent implements OnInit{

  adminLogged : any;
  constructor(private router: Router,private adminServices : AdminServices,private authServices: AuthServices,){}
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
  }

  navigateNotification(notification: any){
    if(!notification.status_Notification){
      const notiUser = {
        idNotification : notification._id
      }
      this.adminServices.updateStatusNotificationAdmin(notiUser).subscribe((res) => {
        this.notificationNavigateHandle(notification.type_Notification);

    
          // this.authServices.setAdminLogged(res);
          this.adminServices.getAdminAccountById(this.adminLogged._id).subscribe((res) => {
            this.authServices.setAdminLogged(res);
          }, (error) => {console.log(error.message)});
     

      }, (error) => {console.log(error.message)})
      // console.log('haha')
      return;
    }
    this.notificationNavigateHandle(notification.type_Notification);

  }

  notificationNavigateHandle(typeNotification : Number){
    switch(typeNotification){
      case 1  : this.router.navigate(['/admin-home']); break;
      // case 2  : this.router.navigate(['/get-users-bought-product-list']); break;
      // case 3  : this.router.navigate(['/get-products-upload-user']); break;


    }
  }


}
